import React, { Component } from 'react';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';

import './groupChoose.css';

export default class GroupChoose extends Component {
    timetableService = new TimetableService();

    state = {
        groups: [],
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

        this.timetableService.getGroupsByDepartmentId(itemId).then((item) => {
            this.setState({
                groups: item,
            });
        });
    }

    showGroups(param) {
        return param.map((item) => {
            const { id, name, сourse } = item;
            return (
                <div
                    key={id}
                    className="groups__item"
                    onClick={() => {
                        this.onItemSelected(id);
                    }}
                >
                    <p className="groups__item-title">{name}</p>
                    <p className="groups__item-text">Курс: {сourse}</p>
                </div>
            );
        });
    }

    render() {
        const { groups, error, selectedGroup } = this.state;

        if (!groups) {
            return <span>Please select department in the list</span>;
        }

        if (error) {
            return <ErrorMessage />;
        }

        return (
            <div className="groups">
                <h3 className="groups__title">Группы выбранной кафедры:</h3>
                <div className="groups__inner">
                    <div className="groups__items">
                        {this.showGroups(groups)}
                    </div>
                </div>
            </div>
        );
    }
}
