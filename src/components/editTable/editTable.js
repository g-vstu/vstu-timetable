import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function EditTable({ patterns }) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Номер пары</th>
                        <th>Корпус</th>
                        <th>Аудитория</th>
                        <th>Дисциплина</th>
                        <th>Тип занятия</th>
                        <th>Группа</th>
                        <th>Номер подгруппы(если 0, то ВСЯ ГРУППА)</th>
                        <th>Преподаватель</th>
                    </tr>
                </thead>
                <tbody>
                    {patterns.map((pattern) => {
                        return (
                            <tr>
                                <td>{pattern.lessonNumber}</td>
                                <td>{pattern.frame}</td>
                                <td>{pattern.location}</td>
                                <td>{pattern.disciplineName}</td>
                                <td>{pattern.typeClassName}</td>
                                <td>{pattern.groupName}</td>
                                <td>{pattern.subGroup}</td>
                                <td>{pattern.teacherFio}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
