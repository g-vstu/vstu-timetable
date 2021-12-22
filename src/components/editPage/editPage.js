import { React, Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import {
    addFilter,
    getPatterns,
} from '../../redux/editPatternsReducer/actions';
import {
    getAllGroups,
    getCommonData,
} from '../../redux/commonInfoReducer/actions';
import EditTable from '../editTable/editTable';
import Spinner from '../spinner';
import { AlertMessage } from '../alert/alert';

class EditPage extends Component {
    state = {
        isClearable: true,
        day: '',
    };

    componentDidMount() {
        this.props.getPatterns();
        this.props.getCommonData();
        this.props.getAllGroups();
    }

    componentWillUnmount() {
        this.props.addFilter('', 'day');
        this.props.addFilter('', 'group');
    }

    changeFilter(item, name) {
        if (item) {
            const { value } = item;
            this.props.addFilter(value, name);
        } else {
            this.props.addFilter('', name);
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
                <table>
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
                            <th>Манипуляции</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patterns.map((pattern) => {
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
                        })}
                    </tbody>
                </table>
            ) : (
                <div>Empty</div>
            )
        ) : null;

        return (
            <div>
                <h3 className="empty_rows">
                    Страница редактирования/отображения расписания
                </h3>
                <br />
                <div className="choose__section">
                    <div className="choose__item">
                        <p className="choose__item-title">
                            Выберите день недели:
                        </p>
                        <div className="choose__item-select1">
                            <Select
                                isClearable={isClearable}
                                onChange={(item) => {
                                    this.changeFilter(item, 'day');
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
                        <p className="choose__item-title">Выберите группу:</p>
                        <div className="choose__item-select1">
                            <Select
                                isClearable={isClearable}
                                onChange={(item) => {
                                    this.changeFilter(item, 'group');
                                    this.props.getPatterns();
                                }}
                                options={groups}
                            />
                        </div>
                    </div>
                </div>
                {spinner}
                {/* {alert && (
                    <div>
                        <AlertMessage text={alert} /> <br />
                    </div>
                )} */}
                {content}
            </div>
        );
    }
}

const mapDispatchToProps = {
    addFilter,
    getPatterns,
    getAllGroups,
    getCommonData,
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
