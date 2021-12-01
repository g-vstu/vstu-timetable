import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { getCommonData } from '../../redux/commonInfoReducer/actions';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

import './renderTable.css';

class RenderTable extends Component {
    timetableService = new TimetableService();

    state = {
        groups: [],
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

        this.props.getCommonData();
        this.addLessonDay();
        this.getGroups();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedSpeciality !== prevProps.selectedSpeciality) {
            this.getGroups();
        } else if (this.props.selectedCourse !== prevProps.selectedCourse) {
            this.getGroups();
        }

        if (this.props.day.value !== prevProps.day.value) {
            this.addLessonDay();
        }
    }

    // Добавление в state День пары
    addLessonDay() {
        this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                lessonDay: this.props.day.value,
            },
        });
    }

    // Все GET запросы
    getGroups() {
        const { selectedSpeciality, selectedCourse } = this.props;

        if (!selectedCourse || !selectedSpeciality) {
            return alert('Сделайте нужные махинации');
        }

        console.log(
            `Специальность: ${selectedSpeciality}, Курс: ${selectedCourse}`
        );

        this.setState({
            groups: [],
        });

        this.timetableService
            .getGroupsByCourseAndSpecialty(selectedSpeciality, selectedCourse)
            .then((item) => {
                item.map((param) => {
                    const { id, name, сourse } = param;

                    return this.setState({
                        groups: [
                            ...this.state.groups,
                            {
                                value: name,
                                label: name,
                                key: id,
                                сourse: сourse,
                            },
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
                alert('Введите все данные');
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

    changeTeacher = (item) => {
        let { value } = item;
        console.log('Выбранный преподаватель:' + ' ' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                teacherFio: value,
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
    changeGroup = (item) => {
        let { value } = item;
        console.log('Группа:' + value);
        return this.setState({
            patternToSend: {
                ...this.state.patternToSend,
                groupName: value,
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
                location: value,
            },
        });
    };

    render() {
        const { patternToSend, groups } = this.state;
        const {
            disciplines,
            subGroups,
            lessonFrame,
            lessonTime,
            lessonType,
            teachers,
        } = this.props;

        const content = (
            <div>
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
                            <td>
                                <Select
                                    onChange={(item) => this.changeGroup(item)}
                                    options={groups}
                                />
                            </td>
                            <td>
                                <Select
                                    onChange={(item) =>
                                        this.changeSubGroup(item)
                                    }
                                    options={subGroups}
                                />
                            </td>
                            <td>
                                <Select
                                    onChange={(item) =>
                                        this.changeTeacher(item)
                                    }
                                    options={teachers}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* <button onClick={() => console.log(this.groups)}>Groups</button> */}
                <button onClick={() => this.postPatternItem(patternToSend)}>
                    Click!
                </button>
            </div>
        );

        return (
            <div className="table">
                <h3>{this.props.day.label}</h3>
                {content}
            </div>
        );
    }
}

const mapDispatchToProps = {
    getCommonData,
};

const mapStateToProps = (state) => ({
    lessonFrame: state.common.lessonFrame,
    subGroups: state.common.subGroups,
    disciplines: state.common.disciplines,
    lessonTime: state.common.lessonTime,
    lessonType: state.common.lessonType,
    teachers: state.common.teachers,
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderTable);
