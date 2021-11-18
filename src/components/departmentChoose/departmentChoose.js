import React, { Component } from 'react';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';
import axios from 'axios';

import './departmentChoose.css';

export default class DepartmentChoose extends Component {
    timetableService = new TimetableService();

    state = {
        departments: [],
        error: false,
        selectedGroup: null,
    };

    onItemSelected(id) {
        return this.setState({
            selectedGroup: id,
        });
    }

    componentDidCatch() {
        this.setState({
            error: true,
        });
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId } = this.props;
        if (!itemId) {
            return;
        }

        this.timetableService.getDepartmentsById(itemId).then((item) => {
            this.setState({
                departments: item,
            });
        });
    }

    showDepartments(param) {
        return param.map((item) => {
            const { id, name, shortName } = item;
            return (
                <div
                    key={id}
                    className="departments__item"
                    onClick={() => {
                        this.onItemSelected(id);
                    }}
                >
                    <p className="departments__item-title">{name}</p>
                    <p className="departments__item-text">
                        Аббревиатура: {shortName}
                    </p>
                </div>
            );
        });
    }

    render() {
        const { departments, error, selectedGroup } = this.state;

        if (!departments || departments === []) {
            return <span>Please select department in the list</span>;
        }

        if (error) {
            return <ErrorMessage />;
        }

        // if (selectedGroup != null) {
        //     console.log('Группа с айди:' + selectedGroup);
        // }

        return (
            <div className="departments">
                <h3 className="departments__title">
                    Кафедры выбранного факультета:
                </h3>
                <div className="departments__inner">
                    <div className="departments__items">
                        {this.showDepartments(departments)}
                    </div>
                </div>
            </div>
        );
    }
}
