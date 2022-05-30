import React from "react";
import { Route, Routes } from "react-router-dom";

import GenerateTable from "./pages/GenerateTable";
import EditPage from "./pages/EditPage";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import RequireAuth from "./components/HOCs/RequireAuth";
import AuthProvider from "./components/HOCs/AuthProvider";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Login />} />
                    <Route
                        path="timetable"
                        element={
                            <RequireAuth>
                                <GenerateTable />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="edittable"
                        element={
                            <RequireAuth>
                                <EditPage />
                            </RequireAuth>
                        }
                    />
                </Route>
            </Routes>
        </AuthProvider>
    );
}
