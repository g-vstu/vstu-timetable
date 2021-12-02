import React, { Component } from 'react';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import { connect } from 'react-redux';
import Select from 'react-select';

import { fillPattern } from '../../redux/editPatternsReducer/actions';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

import './renderTable.css';

class RenderTable extends Component {
    timetableService = new TimetableService();

    state = {
        pattern: {},
    };

    componentDidMount() {
        const { selectedDay } = this.props.dataForTable;

        this.setState({
            pattern: {
                ...this.state.pattern,
                lessonDay: selectedDay.value,
            },
        });
    }

    // componentDidUpdate(prevProps) {
    //     const { selectedDay } = this.props.dataForTable;

    //     if (selectedDay !== prevProps.selectedDay) {
    //         this.addDayToPattern(selectedDay);
    //     }
    // }

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

    // addDayToPattern(item) {
    //     this.setState({
    //         pattern: {
    //             ...this.state.pattern,
    //             lessonDay: item.value,
    //         },
    //     });
    // }

    addPropToPattern(item, name) {
        const { value } = item;

        // return this.props.fillPattern({ value: value, name: name });
        return this.setState({
            pattern: {
                ...this.state.pattern,
                [name]: value,
            },
        });
    }

    addLocationToPattern = (e) => {
        let { value } = e.target;

        // return this.props.fillPattern({ value: value, name: 'location' });
        return this.setState({
            pattern: {
                ...this.state.pattern,
                location: value,
            },
        });
    };

    addPropToReduxPattern() {
        const { pattern } = this.state;
        let counter = 0;

        for (let key in pattern) {
            counter++;
        }

        if (counter === 8) {
            this.props.fillPattern(pattern);
        }
    }

    render() {
        const {
            disciplines,
            subGroups,
            lessonFrame,
            lessonTime,
            lessonType,
            groups,
            teachers,
        } = this.props.dataForTable;

        return (
            <tr>
                <td>
                    <Select
                        onChange={(item) =>
                            this.addPropToPattern(item, 'lessonNumber')
                        }
                        options={lessonTime}
                    />
                </td>
                <td>
                    <Select
                        onChange={(item) =>
                            this.addPropToPattern(item, 'frame')
                        }
                        options={lessonFrame}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="Введите номер аудитории"
                        onChange={this.addLocationToPattern}
                    />
                </td>
                <td>
                    <Select
                        onChange={(item) =>
                            this.addPropToPattern(item, 'disciplineName')
                        }
                        options={disciplines}
                    />
                </td>
                <td>
                    <Select
                        onChange={(item) =>
                            this.addPropToPattern(item, 'typeClassName')
                        }
                        options={lessonType}
                    />
                </td>
                <td>
                    <Select
                        onChange={(item) =>
                            this.addPropToPattern(item, 'groupName')
                        }
                        options={groups}
                    />
                </td>
                <td>
                    <Select
                        onChange={(item) =>
                            this.addPropToPattern(item, 'subGroup')
                        }
                        options={subGroups}
                    />
                </td>
                <td>
                    <Select
                        onChange={(item) =>
                            this.addPropToPattern(item, 'teacherFio')
                        }
                        options={teachers}
                    />
                </td>
                {this.addPropToReduxPattern()}
            </tr>
        );
    }
}

const mapDispatchToProps = {
    fillPattern,
};

export default connect(null, mapDispatchToProps)(RenderTable);
