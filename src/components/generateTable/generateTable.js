import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import {
    getCommonData,
    getGroups,
} from '../../redux/commonInfoReducer/actions';
import { fillPattern } from '../../redux/editPatternsReducer/actions';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';
import RenderTable from '../renderTable/renderTable';

import './generateTable.css';

class GenerateTable extends Component {
    timetableService = new TimetableService();

    state = {
        error: false,
        selectedDay: {
            value: '',
            label: '',
        },
        selectedSpeciality: {
            value: '',
            label: '',
        },
        selectedCourse: {
            value: '',
            label: '',
        },
    };

    componentDidMount() {
        this.props.getCommonData();
    }

    componentDidUpdate(prevState) {
        // const { selectedSpeciality, selectedCourse } = this.state;
        // if (
        //     selectedSpeciality !== prevState.selectedSpeciality ||
        //     selectedCourse !== prevState.selectedCourse
        // ) {
        //     return this.props.getGroups(
        //         selectedSpeciality.value,
        //         selectedCourse.value
        //     );
        // }
    }

    componentDidCatch() {
        this.setState({
            error: true,
        });
    }

    onItemSelected = (item, name) => {
        let { value, label } = item;
        this.setState({
            [name]: {
                value,
                label,
            },
        });
    };

    addPropToPattern(item, name) {
        const { value } = item;

        return this.props.fillPattern({ value: value, name: name });
    }

    render() {
        const { error, selectedDay } = this.state;
        const {
            specialities,
            days,
            courses,
            disciplines,
            subGroups,
            lessonFrame,
            lessonTime,
            lessonType,
            groups,
            teachers,
        } = this.props;

        if (error) {
            return <ErrorMessage />;
        }

        return (
            <div className="table__page">
                <div className="choose__section">
                    <div className="choose__item">
                        <p className="choose__item-title">
                            Выберите день недели:
                        </p>
                        <div className="choose__item-select1">
                            <Select
                                onChange={(item) => {
                                    this.onItemSelected(item, 'selectedDay');
                                    this.addPropToPattern(item, 'lessonDay');
                                }}
                                options={days}
                            />
                        </div>
                    </div>
                    <div className="choose__item">
                        <p className="choose__item-title">
                            Выберите специальность:
                        </p>
                        <div className="choose__item-select2">
                            <Select
                                onChange={(item) =>
                                    this.onItemSelected(
                                        item,
                                        'selectedSpeciality'
                                    )
                                }
                                options={specialities}
                            />
                        </div>
                    </div>
                    <div className="choose__item">
                        <p className="choose__item-title">Выберите курс:</p>
                        <div className="choose__item-select3">
                            <Select
                                onChange={(item) =>
                                    this.onItemSelected(item, 'selectedCourse')
                                }
                                options={courses}
                            />
                        </div>
                    </div>
                </div>
                <div className="table">
                    <h3>{selectedDay.label}</h3>
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
                            <RenderTable
                                dataForTable={{
                                    selectedDay,
                                    disciplines,
                                    subGroups,
                                    lessonFrame,
                                    lessonTime,
                                    lessonType,
                                    groups,
                                    teachers,
                                }}
                            />
                            <RenderTable
                                dataForTable={{
                                    selectedDay,
                                    disciplines,
                                    subGroups,
                                    lessonFrame,
                                    lessonTime,
                                    lessonType,
                                    groups,
                                    teachers,
                                }}
                            />
                        </tbody>
                    </table>
                    {/* <button onClick={() => console.log(this.groups)}>Groups</button> */}
                    {/* <button onClick={() => this.postPatternItem(patternToSend)}>
                    Click!
                </button> */}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    getCommonData,
    getGroups,
    fillPattern,
};

const mapStateToProps = (state) => ({
    specialities: state.common.specialities,
    days: state.common.days,
    courses: state.common.courses,
    lessonFrame: state.common.lessonFrame,
    subGroups: state.common.subGroups,
    disciplines: state.common.disciplines,
    lessonTime: state.common.lessonTime,
    lessonType: state.common.lessonType,
    groups: state.common.groups,
    teachers: state.common.teachers,
});

export default connect(mapStateToProps, mapDispatchToProps)(GenerateTable);
