import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import {
    deletePattern,
    getPatterns,
    patchPattern,
} from "../../../store/editPatternsReducer/actions";

import deleteIcon from "../../../assets/images/delete.svg";
import editIcon from "../../../assets/images/edit.svg";
import tooltipImage from "../../../assets/images/tooltip.svg";

import "./editTable.css";

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: theme.shadows[3],
        fontSize: 15,
        maxWidth: 500,
    },
}));

export default function EditTable({ pattern, day, commonInfo }) {
    const dispatch = useDispatch();
    const [patternToChange, addToPattern] = useState({});
    const {
        lessonTime,
        subGroups,
        periodicity,
        lessonFrame,
        locations,
        disciplines,
        lessonType,
        teachers,
    } = commonInfo;

    useEffect(() => {
        addToPattern(pattern);
    }, [pattern]);

    function whatPeriodicity(weekNumber, numerator) {
        if (weekNumber != null) {
            return (
                <Select
                    onChange={(item) => changePeriodicity(item.value)}
                    defaultValue={periodicity[weekNumber]}
                    options={periodicity}
                />
            );
        }
        if (numerator != null) {
            if (numerator) {
                return (
                    <Select
                        onChange={(item) => {
                            console.log(item);
                            changePeriodicity(item.value);
                        }}
                        defaultValue={periodicity[5]}
                        options={periodicity}
                    />
                );
            } else if (numerator === false) {
                return (
                    <Select
                        onChange={(item) => {
                            console.log(item);
                            changePeriodicity(item.value);
                        }}
                        defaultValue={periodicity[6]}
                        options={periodicity}
                    />
                );
            }
        }
        if (weekNumber === null && numerator === null) {
            return (
                <Select
                    onChange={(item) => {
                        console.log(item);
                        changePeriodicity(item.value);
                    }}
                    defaultValue={periodicity[0]}
                    options={periodicity}
                />
            );
        }
    }

    function changePeriodicity(value) {
        console.log(value);
        if (Number.isInteger(value)) {
            return addToPattern({ ...patternToChange, weekNumber: value });
        } else {
            return addToPattern({ ...patternToChange, numerator: value });
        }
    }

    function whatNumber(number) {
        return (
            <Select
                onChange={(item) =>
                    addToPattern({
                        ...patternToChange,
                        lessonNumber: item.value,
                    })
                }
                defaultValue={lessonTime[number - 1]}
                options={lessonTime}
            />
        );
    }

    function whatLabel(str, arr, name) {
        return (
            <Select
                onChange={(item) =>
                    addToPattern({ ...patternToChange, [name]: item.value })
                }
                defaultValue={arr[arr.findIndex((item) => item.value === str)]}
                options={arr}
            />
        );
    }

    function deleteTableRow(item) {
        console.log(item);
        dispatch(deletePattern(item));
        setTimeout(() => {
            dispatch(getPatterns());
        }, 10);
    }

    // function createTooltipForLocation() {
    //     return <div className="tooltip">{pattern.location}</div>;
    // }
    function tooltipContent(arr, str) {
        return `${arr[arr.findIndex((item) => item.value === str)].tooltip}`;
    }

    return (
        <tr key={pattern.id}>
            <td className="lessonNumber__td">
                {whatNumber(pattern.lessonNumber)}
            </td>
            <td className="pereodicity__td">
                {whatPeriodicity(pattern.weekNumber, pattern.numerator)}
            </td>
            <td className="frame__td">
                {whatLabel(+pattern.frame, lessonFrame, "frame")}
            </td>
            <td className="location__td" style={{ width: "260px" }}>
                <div className="discipline__td-div">
                    {whatLabel(pattern.location, locations, "location")}
                    <LightTooltip
                        title={tooltipContent(locations, pattern.location)}
                    >
                        <img
                            src={tooltipImage}
                            alt="tooltip"
                            className="tooltip"
                        />
                    </LightTooltip>
                </div>
            </td>
            <td className="discipline__td" style={{ width: "230px" }}>
                <div className="discipline__td-div">
                    {whatLabel(
                        pattern.disciplineName,
                        disciplines,
                        "disciplineName"
                    )}
                    <LightTooltip
                        title={tooltipContent(
                            disciplines,
                            pattern.disciplineName
                        )}
                    >
                        <img
                            src={tooltipImage}
                            alt="tooltip"
                            className="tooltip"
                        />
                    </LightTooltip>
                </div>
            </td>
            <td className="typeClassName__td">
                {whatLabel(pattern.typeClassName, lessonType, "typeClassName")}
            </td>
            <td className="groupName__td vertical__top">
                <div className="groupName__td-label">
                    <p>{pattern.groupName}</p>
                </div>
            </td>
            <td className="subGroup__td">
                {whatLabel(pattern.subGroup, subGroups, "subGroup")}
            </td>
            <td className="teacherFio__td">
                {whatLabel(pattern.teacherFio, teachers, "teacherFio")}
            </td>
            <td className="btn__td">
                <div>
                    <button
                        className="change__button"
                        onClick={() => {
                            console.log(patternToChange);
                            dispatch(patchPattern(pattern.id, patternToChange));
                            setTimeout(() => {
                                dispatch(getPatterns());
                            }, 0);
                        }}
                    >
                        <img src={editIcon} alt="Редактировать" />
                    </button>
                    <button
                        className="change__button"
                        onClick={() => deleteTableRow(pattern.id)}
                    >
                        <img src={deleteIcon} alt="Удалить" />
                    </button>
                </div>
            </td>
        </tr>
    );
}
