import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { fillPattern } from "../../../store/editPatternsReducer/actions";
import { getLocations } from "../../../store/commonInfoReducer/actions";
import "./renderTable.css";

import deleteIcon from "../../../assets/images/delete.svg";
import { useMemo } from "react";

export default function RenderTable({ dataForTable }) {
    const [pattern, setPattern] = useState({});
    const dispatch = useDispatch();
    const {
        selectedDay,
        disciplines,
        subGroups,
        lessonTime,
        lessonType,
        lessonFrame,
        groups,
        teachers,
        periodicity,
    } = dataForTable;
    let locations = useSelector((state) => state.common.locations);
    useEffect(() => {
        addPropToPattern(selectedDay, "lessonDay");
    }, [selectedDay]);

    function changePeriodicity(item) {
        const { value } = item;

        if (Number.isInteger(value)) {
            return addPropToPattern(item, "weekNumber");
        } else {
            return addPropToPattern(item, "numerator");
        }
    }

    function selectLocationsForFrame(item, name) {
        dispatch(getLocations(item.value));
        return addPropToPattern(item, name);
    }

    function whatLocation() {
        return;
    }

    function addPropToPattern(item, name) {
        const { value } = item;

        return setPattern((prev) => {
            return { ...prev, [name]: value };
        });
    }

    const addPropToReduxPattern = useMemo(() => {
        let counter = 0;

        for (let key in pattern) {
            counter++;
        }

        if (counter === 10) {
            dispatch(fillPattern(pattern));
        }
    }, [pattern, dispatch]);

    return (
        <tr>
            <td className="lessonNumber__td">
                <Select
                    onChange={(item) => {
                        addPropToPattern(item, "lessonNumber");
                    }}
                    options={lessonTime}
                />
            </td>
            <td className="pereodicity__td">
                <Select
                    onChange={(item) => changePeriodicity(item)}
                    options={periodicity}
                />
            </td>
            <td className="frame__td">
                <Select
                    onChange={(item) => selectLocationsForFrame(item, "frame")}
                    options={lessonFrame}
                />
            </td>
            <td className="location__td">
                <Select
                    onChange={(item) => addPropToPattern(item, "location")}
                    options={locations}
                />
            </td>
            <td className="discipline__td">
                <Select
                    onChange={(item) =>
                        addPropToPattern(item, "disciplineName")
                    }
                    options={disciplines}
                />
            </td>
            <td className="typeClassName__td">
                <Select
                    onChange={(item) => addPropToPattern(item, "typeClassName")}
                    options={lessonType}
                />
            </td>
            <td className="groupName__td">
                <Select
                    onChange={(item) => addPropToPattern(item, "groupName")}
                    options={groups}
                />
            </td>
            <td className="subGroup__td">
                <Select
                    onChange={(item) => addPropToPattern(item, "subGroup")}
                    options={subGroups}
                />
            </td>
            <td className="teacherFio__td">
                <Select
                    onChange={(item) => addPropToPattern(item, "teacherFio")}
                    options={teachers}
                />
            </td>
            <td className="delete__td">
                <button>
                    <img src={deleteIcon} alt="delete" />
                </button>
            </td>
            {addPropToReduxPattern}
        </tr>
    );
}
