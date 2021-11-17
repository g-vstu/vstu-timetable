import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TimetableService from '../../services/timetableService';
import FacultiesInfo from '../facultiesInfo';
import FacultiesAll from '../facultiesAll';
import ErrorMessage from '../errorMessage';
import Header from '../header';
import DepartmentChoose from '../departmentChoose';
import './app.css';

export default class App extends Component {
    timetableService = new TimetableService();

    state = {
        error: false,
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true,
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }
        return (
            <Router>
                <div className="app">
                    <div>
                        <Header />
                    </div>
                    <div>
                        <h3>Выберите необходимый факультет</h3>
                        <FacultiesAll />
                        <Routes>
                            <Route
                                exact
                                path="/department"
                                element={<DepartmentChoose />}
                            />
                        </Routes>
                        {/* <FacultiesInfo /> */}
                    </div>
                </div>
            </Router>
        );
    }
}
