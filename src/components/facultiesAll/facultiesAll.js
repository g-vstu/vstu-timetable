import React, { Component, useEffect } from 'react';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import DepartmentChoose from '../departmentChoose';

import './facultiesAll.css';

export default class FacultiesAll extends Component {
    timetableService = new TimetableService();

    state = {
        faculties: [],
        error: false,
        selectedFaculty: null,
    };

    onItemSelected = (id) => {
        this.setState({
            selectedFaculty: id,
        });
    };

    componentDidCatch() {
        this.setState({
            error: true,
        });
    }

    componentDidMount() {
        this.timetableService.getAllFaculties().then((item) => {
            this.setState({
                faculties: item,
            });
        });
    }

    showFaculties(param) {
        return param.map((item) => {
            const { id, name, shortName, dean, discription } = item;
            return (
                <div
                    key={id}
                    className="faculties__item"
                    onClick={() => {
                        this.onItemSelected(id);
                    }}
                >
                    <p className="faculties__item-title">{name}</p>
                    <p className="faculties__item-text">Декан: {dean}</p>
                    <p className="faculties__item-text">
                        Описание: {discription ? discription : 'Отсутствует'}
                    </p>
                </div>
            );
        });
    }

    render() {
        const { faculties, selectedFaculty, error } = this.state;

        if (error) {
            return <ErrorMessage />;
        }

        return (
            <div className="faculties">
                <h3 className="faculties__title">Факультеты:</h3>
                <div className="faculties__inner">
                    <div className="faculties__items">
                        {this.showFaculties(faculties)}
                    </div>
                </div>
                <p className="faculties__tooltip">
                    ("Заочный", "Заочный факультет", "Магистратура"пока не
                    работают)
                </p>
                <DepartmentChoose itemId={selectedFaculty} />
            </div>
        );
    }
}
