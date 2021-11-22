import React, { Component } from 'react';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';

import './renderTable.css';

export default class RenderTable extends Component {
    timetableService = new TimetableService();

    state = {
        lessonTime: [],
        disciplines: [],
        lessonType: [],
    };

    // Базовые функции компонента
    componentDidMount() {
        this.getLessonTime();
        this.getDisciplines();
        this.getLessonType();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedFaculty !== prevProps.selectedFaculty) {
            this.getDisciplines();
        }
    }

    // Все GET запросы
    getDisciplines() {
        const { selectedFaculty } = this.props;

        if (!selectedFaculty) return alert('Выберите факультет!');

        this.timetableService
            .getDisciplinesByDepartmentFacultyId(selectedFaculty)
            .then((item) => {
                this.setState({
                    disciplines: item,
                });
            });
    }

    getLessonType() {
        this.timetableService.getTypeOfClass().then((item) => {
            this.setState({
                lessonType: item,
            });
        });
    }

    getLessonTime() {
        this.timetableService.getPeriodClass().then((item) => {
            this.setState({
                lessonTime: item,
            });
        });
    }

    // Все SELECT
    selectLessonTime(item) {
        return (
            <select onChange={this.changeLessonTime}>
                {this.selectLessonTimeOptions(item)}
            </select>
        );
    }

    selectLessonTimeOptions(param) {
        return param.map((item) => {
            const { id, timeStart, timeStop } = item;

            return <option value={id} label={timeStart + ' - ' + timeStop} />;
        });
    }

    selectLessonFrame() {
        return (
            <select onChange={this.changeLessonFrame}>
                <option value="1" label="1" />
                <option value="2" label="2" />
                <option value="3" label="3" />
                <option value="4" label="4" />
                <option value="5" label="5" />
            </select>
        );
    }

    selectLessonDiscipline(item) {
        return <select>{this.selectLessonDisciplineOptions(item)}</select>;
    }

    selectLessonDisciplineOptions(param) {
        return param.map((item) => {
            const { id, shortName } = item;

            return <option value={id} label={shortName} />;
        });
    }

    selectLessonType(item) {
        return (
            <select onChange={this.changeLessonType}>
                {this.selectLessonTypeOptions(item)}
            </select>
        );
    }

    selectLessonTypeOptions(param) {
        return param.map((item) => {
            const { id, name } = item;

            return <option value={id} label={name} />;
        });
    }

    selectSubGroup() {
        return (
            <select onChange={this.changeSubGroup}>
                <option />
                <option />
                <option />
            </select>
        );
    }

    // Фиксация изменений в value в SELECT
    changeLessonTime = (e) => {
        let { value } = e.target;
        return console.log('Номер пары:' + value);
    };

    changeLessonFrame = (e) => {
        let { value } = e.target;
        return console.log('Корпус:' + value);
    };

    changeLessonType = (e) => {
        let { value } = e.target;
        return console.log('Тип занятия:' + value);
    };

    changeSubGroup = (e) => {
        let { value } = e.target;
        return console.log('Номер подгруппы' + value);
    };

    render() {
        const { lessonTime, disciplines, lessonType } = this.state;

        return (
            <div className="table">
                <h3>{this.props.day}</h3>
                <table>
                    <tr>
                        <th>Время</th>
                        <th>Корпус</th>
                        <th>Аудитория</th>
                        <th>Дисциплина</th>
                        <th>Тип занятия</th>
                        <th>Группа</th>
                        <th>Подгруппа</th>
                        <th>Преподаватель</th>
                    </tr>
                    <tr>
                        <td>{this.selectLessonTime(lessonTime)}</td>
                        <td>{this.selectLessonFrame()}</td>
                        <td>
                            <input
                                type="text"
                                placeholder="Введите номер аудитории"
                            />
                        </td>
                        <td>{this.selectLessonDiscipline(disciplines)}</td>
                        <td>{this.selectLessonType(lessonType)}</td>
                        <td>Ит-5</td>
                        <td>{this.selectSubGroup()}</td>
                        <td>Казаков В.Е.</td>
                    </tr>
                </table>
            </div>
        );
    }
}
