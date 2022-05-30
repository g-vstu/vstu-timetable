import { React, Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { addFilter, getPatterns } from "../../redux/timetable/reducer";
import {
    getAllGroups,
    getAllLocations,
    getDisciplines,
    getLessonTime,
    getLessonType,
    getTeachers,
} from "../../redux/general/reducer";
import {
    showAlert,
    hideAlert,
    showLoader,
    hideLoader,
} from "../../redux/common/reducer";

import EditTable from "./EditTable";
import Spinner from "../../components/Spinner";
import AlertMessage from "../../components/Alert";

class EditPage extends Component {
    state = {
        isClearable: true,
        day: "",
    };

    componentDidMount() {
        this.props.showLoader();
        this.props.getPatterns();
        this.props.getAllGroups();
        this.props.getLessonTime();
        this.props.getLessonType();
        this.props.getDisciplines();
        this.props.getTeachers();
        this.props.getAllLocations();
        this.props.hideLoader();
    }

    componentWillUnmount() {
        this.props.addFilter({ filter: "", name: "day" });
        this.props.addFilter({ filter: "", name: "group" });
    }

    changeFilter(item, name) {
        if (item) {
            const { value } = item;
            console.log(item);
            this.props.addFilter({ filter: value, name });
        } else {
            console.log(item);
            this.props.addFilter({ filter: "", name });
        }
    }

    render() {
        const { isClearable, day } = this.state;
        const {
            days,
            patterns,
            groups,
            periodicity,
            lessonTime,
            lessonFrame,
            subGroups,
            locations,
            disciplines,
            lessonType,
            teachers,
        } = this.props;

        const spinner = this.props.loading ? <Spinner /> : null;
        const content = !this.props.loading ? (
            this.props.patterns.length ? (
                patterns.map((pattern) => {
                    return (
                        <EditTable
                            key={Math.random()}
                            pattern={pattern}
                            commonInfo={{
                                lessonTime,
                                subGroups,
                                periodicity,
                                lessonFrame,
                                locations,
                                disciplines,
                                lessonType,
                                teachers,
                            }}
                            day={day}
                        />
                    );
                })
            ) : (
                <tr className="empty">
                    <td className="empty_rows" colSpan="9">
                        Чтобы просмотреть расписание, заполните день недели и
                        группу
                    </td>
                </tr>
            )
        ) : null;

        return (
            <div className="table_page">
                {this.props.alert && (
                    <div>
                        <AlertMessage alert={this.props.alert} /> <br />
                    </div>
                )}
                <section className="table__header">
                    <div className="choose__section">
                        <div className="choose__item">
                            <p className="choose__item-title">День недели</p>
                            <div className="choose__item-select1">
                                <Select
                                    isClearable={isClearable}
                                    onChange={(item) => {
                                        this.changeFilter(item, "day");
                                        this.setState({
                                            ...this.state,
                                            day: item,
                                        });
                                        this.props.getPatterns();
                                    }}
                                    options={days}
                                />
                            </div>
                        </div>
                        <div className="choose__item">
                            <p className="choose__item-title">Группа</p>
                            <div className="choose__item-select1">
                                <Select
                                    isClearable={isClearable}
                                    onChange={(item) => {
                                        this.changeFilter(item, "group");
                                        this.props.getPatterns();
                                    }}
                                    options={groups}
                                />
                            </div>
                        </div>
                    </div>
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
                                <th></th>
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
    addFilter,
    getPatterns,
    getAllGroups,
    getAllLocations,
    getDisciplines,
    getLessonTime,
    getLessonType,
    getTeachers,
    showAlert,
    hideAlert,
    showLoader,
    hideLoader,
};

const mapStateToProps = (state) => ({
    loading: state.common.loading,
    patterns: state.timetable.patterns,
    days: state.general.days,
    courses: state.general.courses,
    groups: state.general.groups,
    periodicity: state.general.periodicity,
    lessonTime: state.general.lessonTime,
    lessonFrame: state.general.lessonFrame,
    subGroups: state.general.subGroups,
    locations: state.general.locations,
    disciplines: state.general.disciplines,
    lessonType: state.general.lessonType,
    teachers: state.general.teachers,
    alert: state.common.alert,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
