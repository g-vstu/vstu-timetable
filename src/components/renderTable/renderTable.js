import React, { Component } from 'react';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';
import Select from 'react-select';

import './renderTable.css';

export default class RenderTable extends Component {
    timetableService = new TimetableService();

    state = {
        lessonTime: [],
        lessonFrame: [
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
            { value: 4, label: 4 },
            { value: 5, label: 5 },
        ],
        disciplines: [],
        lessonType: [],
        groups: [],
        subGroups: [
            { value: 0, label: 'Все' },
            { value: 1, label: 1 },
            { value: 2, label: 2 },
        ],
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
        if (!this.props.selectedSpeciality) {
            console.log('Итс бэд!');
        }

        this.getLessonTime();
        this.getLessonType();
        this.addLessonDay();
        this.getGroups();
    }

    componentDidUpdate(prevProps) {
        // this.getDisciplines();
        if (
            this.props.selectedCourse !== prevProps.selectedCourse ||
            this.props.selectedSpeciality !== prevProps.selectedSpeciality
        ) {
            this.getGroups();
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
        this.timetableService
            .getDisciplines()
            .then((item) => {
                item.map((param) => {
                    const { name } = param;

                    return this.setState({
                        disciplines: [
                            ...this.state.disciplines,
                            { value: name, label: name },
                        ],
                    });
                });
            })
            .catch((error) => console.error(error));
    }

    getLessonType() {
        this.timetableService
            .getTypeOfClass()
            .then((item) => {
                item.map((param) => {
                    const { name } = param;

                    return this.setState({
                        lessonType: [
                            ...this.state.lessonType,
                            { value: name, label: name },
                        ],
                    });
                });
            })
            .catch((erorr) => console.error(erorr));
    }

    getLessonTime() {
        this.timetableService
            .getPeriodClass()
            .then((item) => {
                item.map((param) => {
                    const { id, timeStart, timeStop } = param;

                    return this.setState({
                        lessonTime: [
                            ...this.state.lessonTime,
                            { value: id, label: `${timeStart} - ${timeStop}` },
                        ],
                    });
                });
            })
            .catch((error) => console.error(error));
    }

    getGroups() {
        const { selectedSpeciality, selectedCourse } = this.props;

        if (!selectedCourse || !selectedSpeciality) {
            return console.log('Ebalo');
        }

        this.timetableService
            .getGroupsByCourseAndSpecialty(selectedSpeciality, selectedCourse)
            .then((item) => {
                item.map((param) => {
                    const { id, name } = param;

                    return this.setState({
                        groups: [
                            ...this.state.groups,
                            { value: name, label: name, key: id },
                        ],
                    });
                });
            })
            .catch((error) => console.error(error));
    }

    // Все POST запросы
    postPatternItem(body) {
        console.log(body);
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

    // Фиксация изменений в value в SELECT
    changeLessonTime = (item) => {
        let { value } = item;
        console.log('Номер пары:' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                lessonNumber: +value,
            },
        });
    };

    changeLessonFrame = (item) => {
        let { value } = item;
        console.log('Корпус:' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                frame: +value,
            },
        });
    };

    changeLessonType = (item) => {
        let { value } = item;
        console.log('Тип занятия:' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                typeClassName: value,
            },
        });
    };

    changeSubGroup = (item) => {
        let { value } = item;
        console.log('Номер подгруппы:' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                subGroup: +value,
            },
        });
    };

    changeDiscipline = (item) => {
        let { value } = item;
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
        const {
            lessonTime,
            lessonFrame,
            disciplines,
            lessonType,
            patternToSend,
            subGroups,
        } = this.state;

        // if (!this.props) return <div>Заполните данные</div>;

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
                            <td>
                                <Select
                                    onChange={(item) =>
                                        this.changeLessonTime(item)
                                    }
                                    options={lessonTime}
                                />
                            </td>
                            <td>
                                <Select
                                    onChange={(item) =>
                                        this.changeLessonFrame(item)
                                    }
                                    options={lessonFrame}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    placeholder="Введите номер аудитории"
                                    onChange={this.setClassLocation}
                                />
                            </td>
                            <td>
                                <Select
                                    onChange={(item) =>
                                        this.changeDiscipline(item)
                                    }
                                    options={disciplines}
                                />
                            </td>
                            <td>
                                <Select
                                    onChange={(item) =>
                                        this.changeLessonType(item)
                                    }
                                    options={lessonType}
                                />
                            </td>
                            <td>Ит-5</td>
                            <td>
                                <Select
                                    onChange={(item) =>
                                        this.changeSubGroup(item)
                                    }
                                    options={subGroups}
                                />
                            </td>
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
