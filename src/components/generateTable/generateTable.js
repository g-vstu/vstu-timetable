import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

import { getSpecialities } from '../../redux/commonInfoReducer/actions';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';
import RenderTable from '../renderTable/renderTable';

import './generateTable.css';

class GenerateTable extends Component {
    timetableService = new TimetableService();

    state = {
        error: false,
        selectedDay: {},
        selectedSpeciality: null,
        selectedCourse: null,
    };

    componentDidMount() {
        this.props.getSpecialities();
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

    render() {
        const { error, selectedDay, selectedSpeciality, selectedCourse } =
            this.state;
        const { specialities, days, courses } = this.props;

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
                                onChange={(item) => this.onDaySelected(item)}
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
                                    this.onSpecialitySelected(item)
                                }
                                options={specialities}
                            />
                        </div>
                    </div>
                    <div className="choose__item">
                        <p className="choose__item-title">Выберите курс:</p>
                        <div className="choose__item-select3">
                            <Select
                                onChange={(item) => this.onCourseSelected(item)}
                                options={courses}
                            />
                        </div>
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

const mapDispatchToProps = {
    getSpecialities,
};

const mapStateToProps = (state) => ({
    specialities: state.common.specialities,
    days: state.common.days,
    courses: state.common.courses,
});

export default connect(mapStateToProps, mapDispatchToProps)(GenerateTable);
