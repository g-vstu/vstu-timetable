import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { fillPattern } from '../../redux/editPatternsReducer/actions';
import './renderTable.css';

class RenderTable extends Component {
    state = {
        pattern: {},
    };

    componentDidMount() {
        const { selectedDay } = this.props.dataForTable;

        this.addPropToPattern(selectedDay, 'lessonDay');
    }

    changePeriodicity(item) {
        const { value } = item;

        if (Number.isInteger(value)) {
            return this.addPropToPattern(item, 'weekNumber');
        } else {
            return this.addPropToPattern(item, 'numerator');
        }
    }

    addPropToPattern(item, name) {
        const { value } = item;

        return this.setState({
            pattern: {
                ...this.state.pattern,
                [name]: value,
            },
        });
    }

    // addLocationToPattern = (e) => {
    //     let { value } = e.target;

    //     return this.setState({
    //         pattern: {
    //             ...this.state.pattern,
    //             location: value,
    //         },
    //     });
    // };

    addPropToReduxPattern() {
        const { pattern } = this.state;
        let counter = 0;

        for (let key in pattern) {
            counter++;
        }

        if (counter === 10) {
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
            locations,
            groups,
            teachers,
            periodicity,
        } = this.props.dataForTable;

        return (
            <tr>
                <td>
                    <Select
                        onChange={(item) => {
                            this.addPropToPattern(item, 'lessonNumber');
                        }}
                        options={lessonTime}
                    />
                </td>
                <td>
                    <Select
                        onChange={(item) => this.changePeriodicity(item)}
                        options={periodicity}
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
                    {/* <input
                        type="text"
                        placeholder="Введите номер аудитории"
                        onChange={this.addLocationToPattern}
                    /> */}
                    <Select
                        onChange={(item) =>
                            this.addPropToPattern(item, 'location')
                        }
                        options={locations}
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
