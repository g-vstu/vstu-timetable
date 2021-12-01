import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import TimetableService from '../../services/timetableService';
// import FacultiesAll from '../facultiesAll';
import ErrorMessage from '../errorMessage';
import Header from '../header';
// import DepartmentChoose from '../departmentChoose';
import GenerateTable from '../generateTable/generateTable';
import EditPage from '../editPage/editPage';
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
            // <div className="app">
            //     <div className="header">
            //         <div className="container">
            //             <Header />
            //         </div>
            //     </div>
            //     <div className="container">
            //         {/* <FacultiesAll /> */}
            //         <GenerateTable />
            //     </div>
            // </div>
            <Router>
                <div className="app">
                    <div className="header">
                        <div className="container">
                            <Header />
                        </div>
                    </div>
                    <div className="container">
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={() => <Navigate to="/timetable" />}
                            />
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
