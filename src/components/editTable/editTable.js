import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';

import {
    deletePattern,
    getPatterns,
} from '../../redux/editPatternsReducer/actions';

export default function EditTable({ pattern, periodicity, lessonTime, day }) {
    const dispatch = useDispatch();
    const subGroups = useSelector((state) => state.common.subGroups);

    function whatSubGroup(item) {
        return subGroups.map((subGroup) => {
            if (subGroup.value === item) return subGroup.label;
        });
    }

    function whatPeriodicity(weekNumber, numerator) {
        if (weekNumber != null) {
            switch (weekNumber) {
                case 1:
                    return (
                        <Select
                            defaultValue={periodicity[1]}
                            options={periodicity}
                        />
                    );
                case 2:
                    return (
                        <Select
                            defaultValue={periodicity[2]}
                            options={periodicity}
                        />
                    );
                case 3:
                    return (
                        <Select
                            defaultValue={periodicity[3]}
                            options={periodicity}
                        />
                    );
                case 4:
                    return (
                        <Select
                            defaultValue={periodicity[4]}
                            options={periodicity}
                        />
                    );
                default:
                    return (
                        <Select
                            defaultValue={periodicity[0]}
                            options={periodicity}
                        />
                    );
            }
        }
        if (numerator != null) {
            if (numerator) {
                return (
                    <Select
                        defaultValue={periodicity[5]}
                        options={periodicity}
                    />
                );
            } else if (numerator === false) {
                return (
                    <Select
                        defaultValue={periodicity[6]}
                        options={periodicity}
                    />
                );
            }
        }
        if (weekNumber === null && numerator === null) {
            return (
                <Select defaultValue={periodicity[0]} options={periodicity} />
            );
        }
    }

    function whatNumber(number) {
        return (
            <Select
                defaultValue={lessonTime[number - 1]}
                options={lessonTime}
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
            <td>{pattern.frame}</td>
            <td>{pattern.location}</td>
            <td>{pattern.disciplineName}</td>
            <td>{pattern.typeClassName}</td>
            <td>{pattern.groupName}</td>
            <td>{whatSubGroup(pattern.subGroup)}</td>
            <td>{pattern.teacherFio}</td>
            <td>
                <button
                    className="delete__button"
                    onClick={() => deleteTableRow(pattern.id)}
                >
                    <img src="../../../delete-icon-png.svg" alt="delete" />
                </button>
                <button>Редактировать</button>
            </td>
        </tr>
    );
    // <div>
    //     {alert && (
    //         <div>
    //             <AlertMessage text={alert} /> <br />
    //         </div>
    //     )}
    //     {tableContent}
    // </div>
}
