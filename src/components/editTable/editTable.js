import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    deletePattern,
    getPatterns,
} from '../../redux/editPatternsReducer/actions';
import { AlertMessage } from '../alert/alert';
import Modal from '../Modal/Modal';

export default function EditTable({ patterns }) {
    const dispatch = useDispatch();
    const days = useSelector((state) => state.common.days);
    const subGroups = useSelector((state) => state.common.subGroups);
    const alert = useSelector((state) => state.common.alert);

    const [modalActive, setModalActive] = useState(false);

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

    function deleteTableRow(item) {
        console.log(item);
        dispatch(deletePattern(item));
        setTimeout(() => {
            dispatch(getPatterns());
        }, 100);
    }

    const tableContent = patterns.length ? (
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
                    <th>Подгруппа</th>
                    <th>Преподаватель</th>
                    <th>Манипуляции</th>
                </tr>
            </thead>
            <tbody>
                {patterns.map((pattern) => {
                    return (
                        <tr key={pattern.id}>
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
                            <td>
                                <button
                                    className="delete__button"
                                    onClick={() => deleteTableRow(pattern.id)}
                                >
                                    <img
                                        src="../../../delete-icon-png.svg"
                                        alt="delete"
                                    />
                                </button>
                                <button onClick={() => setModalActive(true)}>
                                    Редактировать
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    ) : (
        <h3>Ничего нет, заполните фильтры</h3>
    );

    return (
        <div>
            {alert && (
                <div>
                    <AlertMessage text={alert} /> <br />
                </div>
            )}
            {tableContent}
            <Modal active={modalActive} setActive={setModalActive}>
                <p>
                    Привет, это окно для редактирования занятия, очень удобно,
                    согласен?
                </p>
            </Modal>
        </div>
    );
}
