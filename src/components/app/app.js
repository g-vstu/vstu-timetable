import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../header';
import GenerateTable from '../generateTable/generateTable';
import EditPage from '../editPage/editPage';
import './app.css';

export default function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main>
                    <Routes>
                        <Route exact path="/" element={<GenerateTable />} />
                        <Route
                            exact
                            path="/timetable"
                            element={<GenerateTable />}
                        />
                        <Route exact path="/edittable" element={<EditPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}
