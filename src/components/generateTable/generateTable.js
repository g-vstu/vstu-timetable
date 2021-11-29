import React, { Component } from 'react';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';
import RenderTable from '../renderTable/renderTable';
import Select from 'react-select';

import './generateTable.css';

export default class GenerateTable extends Component {
    timetableService = new TimetableService();

    state = {
        error: false,
        selectedDay: {},
        selectedSpeciality: null,
        selectedCourse: null,
        specialities: [],
        days: [
            { value: 'MONDAY', label: 'Понедельник' },
            { value: 'TUESDAY', label: 'Вторник' },
            { value: 'WEDNESDAY', label: 'Среда' },
            { value: 'THURSDAY', label: 'Четверг' },
            { value: 'FRIDAY', label: 'Пятница' },
            { value: 'SATURDAY', label: 'Суббота' },
            { value: 'SUNDAY', label: 'Воскресенье' },
        ],
        courses: [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6', label: '6' },
        ],
    };

    componentDidMount() {
        this.getSpecialities();
    }

    componentDidUpdate() {}

    componentDidCatch() {
        this.setState({
            error: true,
        });
    }

    onDaySelected = (item) => {
        let { value, label } = item;
        this.setState({
            selectedDay: {
                value: value,
                label: label,
            },
        });
    };

    onSpecialitySelected = (item) => {
        let { value } = item;
        this.setState({
            selectedSpeciality: value,
        });
    };

    onCourseSelected = (item) => {
        let { value } = item;
        this.setState({
            selectedCourse: value,
        });
    };

    showSpeciality(param) {
        return param.map((item) => {
            const { id, name } = item;
            return (
                <option
                    key={id}
                    value={id}
                    label={name}
                    className="choose__item-select__option"
                />
            );
        });
    }

    getSpecialities() {
        this.timetableService
            .getSpecialities()
            .then((item) => {
                item.map((param) => {
                    const { id, name } = param;

                    return this.setState({
                        specialities: [
                            ...this.state.specialities,
                            { value: id, label: name },
                        ],
                    });
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const {
            error,
            selectedDay,
            selectedSpeciality,
            selectedCourse,
            specialities,
            days,
            courses,
        } = this.state;

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
                        <Select
                            onChange={(item) => this.onDaySelected(item)}
                            options={days}
                        />
                    </div>
                    <div className="choose__item">
                        <p className="choose__item-title">
                            Выберите специальность:
                        </p>
                        <Select
                            onChange={(item) => this.onSpecialitySelected(item)}
                            options={specialities}
                        />
                    </div>
                    <div className="choose__item">
                        <p className="choose__item-title">Выберите курс:</p>
                        <Select
                            onChange={(item) => this.onCourseSelected(item)}
                            options={courses}
                        />
                    </div>
                </div>
                <RenderTable
                    day={selectedDay}
                    selectedCourse={selectedCourse}
                    selectedSpeciality={selectedSpeciality}
                />
            </div>
        );
    }
}
