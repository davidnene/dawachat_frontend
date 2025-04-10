import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import AuthContext from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import QueryDosagePage from "./pages/QueryDosagePage";
import PrescriptionPage from "./pages/PrescriptionPage";
import ManageAdminsPage from "./pages/ManageAdminsPage";
import ManageHospitalsPage from "./pages/ManageHospitalsPage";
import ManagePatientsPage from "./pages/ManagePatientsPage_";
import ManageDoctorsPage from "./pages/ManageDoctorsPage";
import DoctorStressLogsPage from "./pages/DoctorStressLogsPage"
import PatientsPage from "./pages/PatientsPage";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {!user ? <Navbar /> : <Header />}
        {user && <Sidebar />}
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute><PatientsPage /></PrivateRoute>} />
          <Route path="/query-dosage" element={<PrivateRoute><QueryDosagePage /></PrivateRoute>} />
          <Route path="/prescribe" element={<PrivateRoute><PrescriptionPage /></PrivateRoute>} />
          <Route path="/manage-admins" element={<PrivateRoute><ManageAdminsPage /></PrivateRoute>} />
          <Route path="/manage-hospitals" element={<PrivateRoute><ManageHospitalsPage /></PrivateRoute>} />
          <Route path="/manage-patients" element={<PrivateRoute><ManagePatientsPage /></PrivateRoute>} />
          <Route path="/manage-doctors" element={<PrivateRoute><ManageDoctorsPage /></PrivateRoute>} />
          <Route path="/stress-logs" element={<PrivateRoute><DoctorStressLogsPage/></PrivateRoute>} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
