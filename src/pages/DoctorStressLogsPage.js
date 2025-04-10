import React from "react";
import { Box } from "@mui/material";
import DoctorStressLogs from "../components/DoctorStressLogs";

const DoctorStressLogsPage = () => {
  return (
    <Box sx={{ ml: { xs: 0, md: 4 }, p: 3 }}>
      <DoctorStressLogs />
    </Box>
  );
};

export default DoctorStressLogsPage;
