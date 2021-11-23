import React, { Component } from 'react';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';
import RenderTable from '../renderTable/renderTable';

import './generateTable.css';

export default class GenerateTable extends Component {
    timetableService = new TimetableService();

    state = {
        error: false,
        dayValue: null,
        dayLabel: null,
        selectedFaculty: null,
        selectedSpeciality: null,
        selectedCourse: null,
        faculties: [],
        specialities: [],
    };

    componentDidMount() {
        this.getFaculties();
        // if (this.state.selectedFaculty) {
        //     this.getSpecialities();
        // }
    }

    componentDidUpdate() {
        this.getFaculties();
        // if (this.state.selectedFaculty) {
        //     this.getSpecialities();
        // }
    }

    componentDidCatch() {
        this.setState({
            error: true,
        });
    }

    onDaySelected = (e) => {
        let { value, label } = e.target;
        this.setState({
            dayValue: value,
            dayLabel: label,
        });
    };

    onFacultySelected = (e) => {
        let { value } = e.target;
        this.setState({
            selectedFaculty: value,
        });
    };

    onSpecialitySelected = (e) => {
        let { value } = e.target;
        this.setState({
            selectedSpeciality: value,
        });
    };

    onCourseSelected = (e) => {
        let { value } = e.target;
        this.setState({
            selectedCourse: value,
        });
    };

    showFaculty(param) {
        return param.map((item) => {
            const { id, name } = item;
            return (
                <option
                    key={id}
                    value={id}
                    label={name}
                    className="choose__faculty-select__option"
                />
            );
        });
    }

    showSpeciality(param) {
        return param.map((item) => {
            const { id, name } = item;
            return (
                <option
                    key={id}
                    value={id}
                    label={name}
                    className="choose__speciality-select__option"
                />
            );
        });
    }

    getFaculties() {
        this.timetableService.getAllFaculties().then((item) => {
            this.setState({
                faculties: item,
            });
        });
    }

    getSpecialities() {
        const { selectedFaculty } = this.state;

        this.timetableService
            .getSpecialitiesByFacultyId(selectedFaculty)
            .then((item) => {
                this.setState({
                    specialities: item,
                });
            });
    }

    render() {
        const {
            error,
            dayValue,
            dayLabel,
            selectedFaculty,
            selectedCourse,
            faculties,
            specialities,
        } = this.state;

        if (error) {
            return <ErrorMessage />;
        }

        return (
            <div className="table__page">
                <div className="choose__section">
                    <div className="choose__day">
                        <p className="choose__day-title">
                            Выберите день недели:
                        </p>
                        <select
                            className="choose__day-select"
                            onChange={this.onDaySelected}
                        >
                            <option
                                className="choose__day-select__option"
                                label="—"
                                selected
                            />
                            <option
                                value="MONDAY"
                                label="Понедельник"
                                className="choose__day-select__option"
                            />
                            <option
                                value="TUESDAY"
                                label="Вторник"
                                className="choose__day-select__option"
                            />
                            <option
                                value="WEDNESDAY"
                                label="Среда"
                                className="choose__day-select__option"
                            />
                            <option
                                value="THURSDAY"
                                label="Четверг"
                                className="choose__day-select__option"
                            />
                            <option
                                value="FRIDAY"
                                label="Пятница"
                                className="choose__day-select__option"
                            />
                            <option
                                value="SATURDAY"
                                label="Суббота"
                                className="choose__day-select__option"
                            />
                            <option
                                value="SUNDAY"
                                label="Воскресенье"
                                className="choose__day-select__option"
                            />
                        </select>
                    </div>
                    <div className="choose__faculty">
                        <p className="choose__faculty-title">
                            Выберите факультет:
                        </p>
                        <select
                            className="choose__faculty-select"
                            onChange={this.onFacultySelected}
                        >
                            <option
                                className="choose__faculty-select__option"
                                label="—"
                                selected
                            />
                            {this.showFaculty(faculties)}
                        </select>
                    </div>
                    <div className="choose__speciality">
                        <p className="choose__speciality-title">
                            Выберите факультет:
                        </p>
                        <select
                            className="choose__speciality-select"
                            onChange={this.onSpecialitySelected}
                        >
                            <option
                                className="choose__speciality-select__option"
                                label="—"
                                selected
                            />
                            {this.showSpeciality(specialities)}
                        </select>
                    </div>
                    <div className="choose__course">
                        <p className="choose__course-title">Выберите курс:</p>
                        <select
                            className="choose__course-select"
                            onChange={this.onCourseSelected}
                        >
                            <option
                                className="choose__course-select__option"
                                label="—"
                                selected
                            />
                            <option
                                value="1"
                                label="1"
                                className="choose__course-select__option"
                            />
                            <option
                                value="2"
                                label="2"
                                className="choose__course-select__option"
                            />
                            <option
                                value="3"
                                label="3"
                                className="choose__course-select__option"
                            />
                            <option
                                value="4"
                                label="4"
                                className="choose__course-select__option"
                            />
                            <option
                                value="5"
                                label="5"
                                className="choose__course-select__option"
                            />
                            <option
                                value="6"
                                label="6"
                                className="choose__course-select__option"
                            />
                        </select>
                    </div>
                </div>
                <RenderTable
                    day={dayValue}
                    selectedCourse={selectedCourse}
                    selectedFaculty={selectedFaculty}
                />
            </div>
        );
    }
}
