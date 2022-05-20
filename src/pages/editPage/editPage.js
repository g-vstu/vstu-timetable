import { React, Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";

import {
    addFilter,
    getPatterns,
} from "../../store/editPatternsReducer/actions";
import {
    getAllGroups,
    getCommonData,
    getAllLocations,
} from "../../store/commonInfoReducer/actions";
import EditTable from "./editTable";
import Spinner from "../../components/spinner";
import { AlertMessage } from "../../components/alert/alert";

class EditPage extends Component {
    state = {
        isClearable: true,
        day: "",
    };

    componentDidMount() {
        this.props.getPatterns();
        this.props.getCommonData();
        this.props.getAllGroups();
        this.props.getAllLocations();
    }

    componentWillUnmount() {
        this.props.addFilter("", "day");
        this.props.addFilter("", "group");
    }

    changeFilter(item, name) {
        if (item) {
            const { value } = item;
            this.props.addFilter(value, name);
        } else {
            this.props.addFilter("", name);
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
    getCommonData,
    getAllLocations,
};

const mapStateToProps = (state) => ({
    loading: state.edit.loading,
    patterns: state.edit.patterns,
    days: state.common.days,
    courses: state.common.courses,
    groups: state.common.groups,
    periodicity: state.common.periodicity,
    lessonTime: state.common.lessonTime,
    lessonFrame: state.common.lessonFrame,
    subGroups: state.common.subGroups,
    locations: state.common.locations,
    disciplines: state.common.disciplines,
    lessonType: state.common.lessonType,
    teachers: state.common.teachers,
    alert: state.common.alert,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
