import React, { useState } from "react";
import ManagePrescriptions from "../components/ManagePrescriptions";
import QueryDosage from "../components/QueryDosage";
import { Grid, Box, Button } from "@mui/material";

const ManagePrescriptionPage = () => {
  const [showQueryDosage, setShowQueryDosage] = useState(false); // Toggle state

  return (
    <Box sx={{ ml: { xs: 0, md: 4 }, p: 3 }}>
      {/* Button Wrapper for Right Alignment */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", ml: 2, mb: 2}}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowQueryDosage(!showQueryDosage)}
        >
          {showQueryDosage ? "Hide Query Dosage" : "Query Dosage"}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Conditionally Render QueryDosage */}
        {showQueryDosage && (
          <Grid item xs={12} md={4}>
            <QueryDosage />
          </Grid>
        )}

        {/* Adjust ManagePrescriptions width based on QueryDosage state */}
        <Grid item xs={12} md={showQueryDosage ? 8 : 12}>
          <ManagePrescriptions />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagePrescriptionPage;
