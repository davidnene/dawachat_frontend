import React from "react";
import DoctorManagement from "../components/DoctorManagement";
import { Box } from "@mui/material";

const ManageDoctorsPage = () => {
  return (
    <Box sx={{ ml: { xs: 0, md: 5 }, p: 3 }}> 
      <DoctorManagement />
    </Box>
  );
};

export default ManageDoctorsPage;
