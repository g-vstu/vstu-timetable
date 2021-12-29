import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import {
    deletePattern,
    getPatterns,
    patchPattern,
} from '../../redux/editPatternsReducer/actions';

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
    }, []);

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

    return (
        <tr key={pattern.id}>
            <td>{whatNumber(pattern.lessonNumber)}</td>
            <td>{whatPeriodicity(pattern.weekNumber, pattern.numerator)}</td>
            <td>{whatLabel(+pattern.frame, lessonFrame, 'frame')}</td>
            <td>{whatLabel(pattern.location, locations, 'location')}</td>
            <td>
                {whatLabel(
                    pattern.disciplineName,
                    disciplines,
                    'disciplineName'
                )}
            </td>
            <td>
                {whatLabel(pattern.typeClassName, lessonType, 'typeClassName')}
            </td>
            <td>{pattern.groupName}</td>
            <td>{whatLabel(pattern.subGroup, subGroups, 'subGroup')}</td>
            <td>{whatLabel(pattern.teacherFio, teachers, 'teacherFio')}</td>
            <td>
                <button
                    className="delete__button"
                    onClick={() => deleteTableRow(pattern.id)}
                >
                    <img src="./delete-icon.svg" alt="delete" />
                </button>
                <button
                    onClick={() => {
                        console.log(patternToChange);
                        dispatch(patchPattern(pattern.id, patternToChange));
                        setTimeout(() => {
                            dispatch(getPatterns());
                        }, 0);
                    }}
                >
                    Редактировать
                </button>
            </td>
        </tr>
    );
}
