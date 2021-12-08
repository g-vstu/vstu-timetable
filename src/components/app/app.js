import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorMessage from '../errorMessage';
import Header from '../header';
import GenerateTable from '../generateTable/generateTable';
import EditPage from '../editPage/editPage';
import './app.css';

export default class App extends Component {
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
                    <div className="header">
                        <div className="container">
                            <Header />
                        </div>
                    </div>
                    <div className="container">
                        <Routes>
                            <Route exact path="/" element={<GenerateTable />} />
                            <Route
                                exact
                                path="/timetable"
                                element={<GenerateTable />}
                            />
                            <Route
                                exact
                                path="/edittable"
                                element={<EditPage />}
                            />
                        </Routes>
                    </div>
                </div>
            </Router>
        );
    }
}
