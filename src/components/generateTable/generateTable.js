import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import {
    getCommonData,
    getGroups,
} from '../../redux/commonInfoReducer/actions';
import {
    postPatternsList,
    clearPatternToSend,
} from '../../redux/editPatternsReducer/actions';
import ErrorMessage from '../errorMessage';
import RenderTable from '../renderTable/renderTable';

import './generateTable.css';
import { AlertMessage } from '../alert/alert';

class GenerateTable extends Component {
    state = {
        error: false,
        selectedDay: {},
        selectedSpeciality: {},
        selectedCourse: {},
        rows: [],
    };

    componentDidMount() {
        this.props.getCommonData();
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedSpeciality, selectedCourse } = this.state;

        if (
            selectedSpeciality !== prevState.selectedSpeciality ||
            selectedCourse !== prevState.selectedCourse
        ) {
            this.setState({
                rows: [],
            });
            this.props.getGroups(
                selectedSpeciality.value,
                selectedCourse.value
            );
        }
    }

    componentDidCatch() {
        this.setState({
            error: true,
        });
    }

    componentWillUnmount() {
        this.props.clearPatternToSend();
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

    addRow = () => {
        const { selectedDay } = this.state;
        const {
            disciplines,
            subGroups,
            lessonFrame,
            lessonTime,
            lessonType,
            groups,
            locations,
            teachers,
            periodicity,
        } = this.props;

        this.setState({
            rows: [
                ...this.state.rows,
                <RenderTable
                    key={Math.random()}
                    dataForTable={{
                        selectedDay,
                        disciplines,
                        subGroups,
                        lessonFrame,
                        lessonTime,
                        lessonType,
                        locations,
                        groups,
                        teachers,
                        periodicity,
                    }}
                />,
            ],
        });
    };

    render() {
        const { error, rows } = this.state;
        const { specialities, days, courses, patternsToSend } = this.props;

        const selectedOptions = (
            <div className="choose__section">
                <div className="choose__item">
                    <p className="choose__item-title">День недели</p>
                    <div className="choose__item-select1">
                        <Select
                            onChange={(item) => {
                                this.onItemSelected(item, 'selectedDay');
                            }}
                            options={days}
                        />
                    </div>
                </div>
                <div className="choose__item">
                    <p className="choose__item-title">Специальность</p>
                    <div className="choose__item-select2">
                        <Select
                            onChange={(item) =>
                                this.onItemSelected(item, 'selectedSpeciality')
                            }
                            options={specialities}
                        />
                    </div>
                </div>
                <div className="choose__item">
                    <p className="choose__item-title">Курс</p>
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
        );

        const buttonSection = (
            <div className="button__section">
                <button
                    className="button__section-btn"
                    onClick={() => this.addRow()}
                >
                    Новая строка
                </button>
                <button
                    className="button__section-btn"
                    onClick={() => this.props.postPatternsList(patternsToSend)}
                >
                    Сохранить занятия
                </button>
            </div>
        );

        if (error) {
            return <ErrorMessage />;
        }

        const content = rows.length ? (
            rows.map((item) => {
                return item;
            })
        ) : (
            <tr className="empty">
                <td className="empty_rows" colSpan="9">
                    Чтобы добавьте строчку, заполните день недели, группу и
                    курс, а затем нажмите на кнопку «Новая строка»
                </td>
            </tr>
        );

        return (
            <div className="table__page">
                {this.props.alert && (
                    <div>
                        <AlertMessage alert={this.props.alert} /> <br />
                    </div>
                )}

                <section className="table__header">
                    {selectedOptions}
                    {buttonSection}
                </section>
                <section className="table__section">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Время</th>
                                <th>Переодичность</th>
                                <th>Корпус</th>
                                <th>Аудитория</th>
                                <th>Дисциплина</th>
                                <th>Тип занятия</th>
                                <th>Группа</th>
                                <th>Подгруппа</th>
                                <th>Преподаватель</th>
                            </tr>
                        </thead>
                        <tbody>{content}</tbody>
                    </table>
                </section>
            </div>
        );
    }
}

const mapDispatchToProps = {
    getCommonData,
    getGroups,
    postPatternsList,
    clearPatternToSend,
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
    locations: state.common.locations,
    groups: state.common.groups,
    teachers: state.common.teachers,
    patternsToSend: state.edit.patternsToSend,
    alert: state.common.alert,
    periodicity: state.common.periodicity,
});

export default connect(mapStateToProps, mapDispatchToProps)(GenerateTable);
