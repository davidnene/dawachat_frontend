import React from 'react';
import ManagePatients from '../components/ManagePatients';
import { Box } from "@mui/material";

const ManagePatientsPage = () => {
    
    return (
        <Box sx={{ ml: { xs: 0, md: 5 }, p: 3 }}> 
          <ManagePatients />
        </Box>
      );


};

export default ManagePatientsPage;