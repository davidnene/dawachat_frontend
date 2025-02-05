import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import QueryDosagePage from './pages/QueryDosagePage';
import PrescriptionPage from './pages/PrescriptionPage';
import ManageAdminsPage from './pages/ManageAdminsPage';
import ManageHospitalsPage from './pages/ManageHospitalsPage';
import ManagePatientsPage from './pages/ManagepatientsPage';
import ManageDoctorsPage from './pages/ManageDoctorsPage';
import PatientsPage from './pages/PatientsPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/patients" element={<PrivateRoute><PatientsPage /></PrivateRoute>} />
                    <Route path="/query-dosage" element={<PrivateRoute><QueryDosagePage /></PrivateRoute>} />
                    <Route path="/prescribe" element={<PrivateRoute><PrescriptionPage /></PrivateRoute>} />
                    <Route path="/manage-admins" element={<PrivateRoute>< ManageAdminsPage /></PrivateRoute>} />
                    <Route path="/manage-hospitals" element={<PrivateRoute>< ManageHospitalsPage/></PrivateRoute>} />
                    <Route path="/manage-patients" element={<PrivateRoute>< ManagePatientsPage/></PrivateRoute>} />
                    <Route path="/manage-doctors" element={<PrivateRoute>< ManageDoctorsPage/></PrivateRoute>} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
