import { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import {
    getLessonType,
    getLessonTime,
    getTeachers,
    getDisciplines,
    getSpecialties,
    getGroups,
} from "../../redux/general/reducer";

import {
    showAlert,
    hideAlert,
    showLoader,
    hideLoader,
} from "../../redux/common/reducer";

import {
    postPatternsList,
    clearPatternToSend,
} from "../../store/editPatternsReducer/actions";

import ErrorMessage from "../../components/ErrorMessage";
import RenderTable from "./renderTable";
import Spinner from "../../components/Spinner";
import AlertMessage from "../../components/Alert";

import "./styled.css";

class GenerateTable extends Component {
    state = {
        error: false,
        selectedDay: {},
        selectedSpecialty: {},
        selectedCourse: {},
        rows: [],
    };

    componentDidMount() {
        this.props.showLoader();
        this.props.getSpecialties();
        this.props.getLessonTime();
        this.props.getDisciplines();
        this.props.getLessonType();
        this.props.getTeachers();
        this.props.hideLoader();
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedSpecialty, selectedCourse } = this.state;

        if (
            selectedSpecialty !== prevState.selectedSpecialty ||
            selectedCourse !== prevState.selectedCourse
        ) {
            this.setState({
                rows: [],
            });
            if (selectedSpecialty.value && selectedCourse.value) {
                this.props.getGroups({
                    id: selectedSpecialty.value,
                    courseNum: selectedCourse.value,
                });
            }
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
        const { specialties, days, courses, patternsToSend } = this.props;

        const selectedOptions = (
            <div className="choose__section">
                <div className="choose__item">
                    <p className="choose__item-title">День недели</p>
                    <div className="choose__item-select1">
                        <Select
                            onChange={(item) => {
                                this.onItemSelected(item, "selectedDay");
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
                                this.onItemSelected(item, "selectedSpeciality")
                            }
                            options={specialties}
                        />
                    </div>
                </div>
                <div className="choose__item">
                    <p className="choose__item-title">Курс</p>
                    <div className="choose__item-select3">
                        <Select
                            onChange={(item) =>
                                this.onItemSelected(item, "selectedCourse")
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

        const spinner = this.props.loading ? <Spinner /> : null;
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
                {spinner}
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
    getGroups,
    getLessonType,
    getLessonTime,
    getTeachers,
    getDisciplines,
    getSpecialties,
    postPatternsList,
    clearPatternToSend,
    showAlert,
    hideAlert,
    showLoader,
    hideLoader,
};

const mapStateToProps = (state) => ({
    loading: state.common.loading,
    specialties: state.general.specialties,
    days: state.general.days,
    courses: state.general.courses,
    lessonFrame: state.general.lessonFrame,
    subGroups: state.general.subGroups,
    disciplines: state.general.disciplines,
    lessonTime: state.general.lessonTime,
    lessonType: state.general.lessonType,
    locations: state.general.locations,
    groups: state.general.groups,
    teachers: state.general.teachers,
    // patternsToSend: state.edit.patternsToSend,
    alert: state.common.alert,
    periodicity: state.general.periodicity,
});

export default connect(mapStateToProps, mapDispatchToProps)(GenerateTable);
