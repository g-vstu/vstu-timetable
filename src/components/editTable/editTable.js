import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function EditTable({ patterns }) {
    const days = useSelector((state) => state.common.days);
    const subGroups = useSelector((state) => state.common.subGroups);

    function whatDay(item) {
        return days.map((day) => {
            if (day.value === item) return day.label;
        });
    }

    function whatSubGroup(item) {
        return subGroups.map((subGroup) => {
            if (subGroup.value === item) return subGroup.label;
        });
    }

    function whatPeriodicity(weekNumber, numerator) {
        if (weekNumber != null) {
            return weekNumber + ' неделя';
        }
        if (numerator != null) {
            if (numerator) {
                return 'Числитель';
            } else if (numerator === false) {
                return 'Знаменатель';
            }
        }
        if (weekNumber === null && numerator === null) {
            return 'Всегда';
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>День недели</th>
                        <th>Номер пары</th>
                        <th>Переодичность</th>
                        <th>Корпус</th>
                        <th>Аудитория</th>
                        <th>Дисциплина</th>
                        <th>Тип занятия</th>
                        <th>Группа</th>
                        <th>Номер подгруппы</th>
                        <th>Преподаватель</th>
                    </tr>
                </thead>
                <tbody>
                    {patterns.map((pattern) => {
                        return (
                            <tr>
                                <td>{whatDay(pattern.lessonDay)}</td>
                                <td>{pattern.lessonNumber}</td>
                                <td>
                                    {whatPeriodicity(
                                        pattern.weekNumber,
                                        pattern.numerator
                                    )}
                                </td>
                                <td>{pattern.frame}</td>
                                <td>{pattern.location}</td>
                                <td>{pattern.disciplineName}</td>
                                <td>{pattern.typeClassName}</td>
                                <td>{pattern.groupName}</td>
                                <td>{whatSubGroup(pattern.subGroup)}</td>
                                <td>{pattern.teacherFio}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
