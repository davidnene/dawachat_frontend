import React from "react";
import ManagePrescriptions from "../components/ManagePrescriptions";
import { Box } from "@mui/material";

const ManagePrescriptionPage = () => {
  return (
    <Box sx={{ ml: { xs: 0, md: 5 }, p: 3 }}> 
      <ManagePrescriptions />
    </Box>
  );
};

export default ManagePrescriptionPage;
