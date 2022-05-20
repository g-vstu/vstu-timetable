import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import GenerateTable from "./pages/GenerateTable";
import EditPage from "./pages/EditPage";

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
