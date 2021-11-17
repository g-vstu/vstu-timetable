import React, { Component, useEffect } from 'react';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';
import './facultiesAll.css';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import DepartmentChoose from '../departmentChoose';
export default class FacultiesAll extends Component {
    timetableService = new TimetableService();

    state = {
        faculties: [],
        error: false,
        selectedFaculty: null,
    };

    componentDidMount() {
        this.timetableService.getAllFaculties().then((item) => {
            this.setState({
                faculties: item,
            });
        });
    }

    onItemSelected = (id) => {
        this.setState({
            selectedFaculty: id,
        });
    };

    showFaculties(param) {
        return param.map((item) => {
            const { id, name } = item;
            return (
                <Link
                    to="/department"
                    key={id}
                    className="faculties__choose-btn"
                >
                    {name}
                </Link>
            );
        });
    }

    componentDidCatch() {
        this.setState({
            error: true,
        });
    }

    render() {
        const faculties = this.state.faculties;

        if (this.state.error) {
            return <ErrorMessage />;
        }

        return (
            <div>
                <h3>
                    Не нажимайте на "Заочный" и "Заочный факультет"! Они пока не
                    работают!
                </h3>
                {this.showFaculties(faculties)}
            </div>
        );
    }
}
