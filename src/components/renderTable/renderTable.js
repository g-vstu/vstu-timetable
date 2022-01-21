import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { fillPattern } from '../../redux/editPatternsReducer/actions';
import { getLocations } from '../../redux/commonInfoReducer/actions';
import './renderTable.css';

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
        addPropToPattern(selectedDay, 'lessonDay');
    }, [selectedDay]);

    function changePeriodicity(item) {
        const { value } = item;

        if (Number.isInteger(value)) {
            return addPropToPattern(item, 'weekNumber');
        } else {
            return addPropToPattern(item, 'numerator');
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

    function addPropToReduxPattern() {
        let counter = 0;

        for (let key in pattern) {
            counter++;
        }

        if (counter === 10) {
            dispatch(fillPattern(pattern));
        }
    }

    return (
        <tr>
            <td>
                <Select
                    onChange={(item) => {
                        addPropToPattern(item, 'lessonNumber');
                    }}
                    options={lessonTime}
                />
            </td>
            <td>
                <Select
                    onChange={(item) => changePeriodicity(item)}
                    options={periodicity}
                />
            </td>
            <td>
                <Select
                    onChange={(item) => selectLocationsForFrame(item, 'frame')}
                    options={lessonFrame}
                />
            </td>
            <td>
                {/* <input
                        type="text"
                        placeholder="Введите номер аудитории"
                        onChange={this.addLocationToPattern}
                    /> */}
                <Select
                    onChange={(item) => addPropToPattern(item, 'location')}
                    options={locations}
                />
                {/* {whatLocation()} */}
            </td>
            <td>
                <Select
                    onChange={(item) =>
                        addPropToPattern(item, 'disciplineName')
                    }
                    options={disciplines}
                />
            </td>
            <td>
                <Select
                    onChange={(item) => addPropToPattern(item, 'typeClassName')}
                    options={lessonType}
                />
            </td>
            <td>
                <Select
                    onChange={(item) => addPropToPattern(item, 'groupName')}
                    options={groups}
                />
            </td>
            <td>
                <Select
                    onChange={(item) => addPropToPattern(item, 'subGroup')}
                    options={subGroups}
                />
            </td>
            <td>
                <Select
                    onChange={(item) => addPropToPattern(item, 'teacherFio')}
                    options={teachers}
                />
            </td>
            {addPropToReduxPattern()}
        </tr>
    );
}
