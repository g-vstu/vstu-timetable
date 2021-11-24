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
        patternToSend: {
            lessonDay: null,
            numerator: null,
            weekNumber: null,
            lessonNumber: null,
            subGroup: null,
            frame: null,
            location: null,
            disciplineName: null,
            typeClassName: null,
            groupName: null,
            teacherFio: null,
        },
    };

    // Базовые функции компонента
    componentDidMount() {
        this.getLessonTime();
        this.getDisciplines();
        this.getLessonType();
        this.addLessonDay();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedFaculty !== prevProps.selectedFaculty) {
            this.getDisciplines();
        }

        if (this.props.day !== prevProps.day) {
            this.addLessonDay();
        }
    }

    // Добавление в state День пары
    addLessonDay() {
        this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                lessonDay: this.props.day,
            },
        });
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
            })
            .catch((error) => console.error(error));
    }

    getLessonType() {
        this.timetableService
            .getTypeOfClass()
            .then((item) => {
                this.setState({
                    lessonType: item,
                });
            })
            .catch((erorr) => console.error(erorr));
    }

    getLessonTime() {
        this.timetableService
            .getPeriodClass()
            .then((item) => {
                this.setState({
                    lessonTime: item,
                });
            })
            .catch((error) => console.error(error));
    }

    // Все POST запросы
    postPatternItem(body) {
        this.timetableService
            .postResource(body)
            .then((item) => {
                alert('Данные добавлены');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Все SELECT
    selectLessonTime(item) {
        return (
            <select onChange={this.changeLessonTime}>
                <option label="—" />
                {this.selectLessonTimeOptions(item)}
            </select>
        );
    }

    selectLessonTimeOptions(param) {
        return param.map((item) => {
            const { id, timeStart, timeStop } = item;

            return (
                <option
                    key={id}
                    value={id}
                    label={timeStart + ' - ' + timeStop}
                />
            );
        });
    }

    selectLessonFrame() {
        return (
            <select onChange={this.changeLessonFrame}>
                <option label="—" />
                <option value="1" label="1" />
                <option value="2" label="2" />
                <option value="3" label="3" />
                <option value="4" label="4" />
                <option value="5" label="5" />
            </select>
        );
    }

    selectLessonDiscipline(item) {
        return (
            <select onChange={this.changeDiscipline}>
                <option label="—" />
                {this.selectLessonDisciplineOptions(item)}
            </select>
        );
    }

    selectLessonDisciplineOptions(param) {
        return param.map((item) => {
            const { id, name } = item;

            return <option key={id} value={name} label={name} />;
        });
    }

    selectLessonType(item) {
        return (
            <select onChange={this.changeLessonType}>
                <option label="—" />
                {this.selectLessonTypeOptions(item)}
            </select>
        );
    }

    selectLessonTypeOptions(param) {
        return param.map((item) => {
            const { id, name } = item;

            return <option key={id} value={name} label={name} />;
        });
    }

    selectSubGroup() {
        return (
            <select onChange={this.changeSubGroup}>
                <option label="—" />
                <option value="0" label="ВСЕ" />
                <option value="1" label="1" />
                <option value="2" label="2" />
            </select>
        );
    }

    // Фиксация изменений в value в SELECT
    changeLessonTime = (e) => {
        let { value } = e.target;
        console.log('Номер пары:' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                lessonNumber: +value,
            },
        });
    };

    changeLessonFrame = (e) => {
        let { value } = e.target;
        console.log('Корпус:' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                frame: +value,
            },
        });
    };

    changeLessonType = (e) => {
        let { value } = e.target;
        console.log('Тип занятия:' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                typeClassName: value,
            },
        });
    };

    changeSubGroup = (e) => {
        let { value } = e.target;
        console.log('Номер подгруппы:' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                subGroup: +value,
            },
        });
    };

    changeDiscipline = (e) => {
        let { value } = e.target;
        console.log('Предмет:' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                disciplineName: value,
            },
        });
    };
    // TODO: ТУТ СЕЙЧАС БУДУТ ХАРДКОДОВЫЕ ПЕРЕМЕННЫЕ!!!
    setClassLocation = (e) => {
        let { value } = e.target;
        console.log('Аудитория номер ' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                location: +value,
                groupName: 'Ит-5',
                teacherFio: 'Казаков В.Е.',
            },
        });
    };

    render() {
        const { lessonTime, disciplines, lessonType, patternToSend } =
            this.state;

        return (
            <div className="table">
                <h3>{this.props.day}</h3>
                <table>
                    <thead>
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
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.selectLessonTime(lessonTime)}</td>
                            <td>{this.selectLessonFrame()}</td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Введите номер аудитории"
                                    onChange={this.setClassLocation}
                                />
                            </td>
                            <td>{this.selectLessonDiscipline(disciplines)}</td>
                            <td>{this.selectLessonType(lessonType)}</td>
                            <td>Ит-5</td>
                            <td>{this.selectSubGroup()}</td>
                            <td>Казаков В.Е.</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => this.postPatternItem(patternToSend)}>
                    Click!
                </button>
            </div>
        );
    }
}
