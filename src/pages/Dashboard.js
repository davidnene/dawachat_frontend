import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import VisualizationCard from "../components/VisualizationCard";
import AlertCard from "../components/AlertCard";
import { fetchDashboardData } from "../services/dashboardService";


function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    diseaseFrequency: [],
    patientDemographics: [],
    alerts: [],
  });

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDashboardData();
      setDashboardData(data);
    }
    fetchData();
  }, []);

  return (
    <Box sx={{ ml: { xs: 0, md: 4 }, p: 0 }}>
      <div className="container mt-5">
        {/* <Typography variant="h4" className="mb-4 text-center">
          Dashboard
        </Typography> */}
          {/* Outbreak Alerts */}
          {dashboardData.diseaseFrequency
            .filter((disease) => disease.value > 15) // Filter for outbreaks
            .map((disease) => (
              <Grid item xs={12} md={4} key={disease.label}>
                <AlertCard disease={disease.label} frequency={disease.value} />
              </Grid>
            ))}
        <Grid container spacing={3}>
          {/* Visualization Cards */}
          <Grid item xs={12} md={6}>
            <VisualizationCard
              title="Disease Frequency"
              data={dashboardData.diseaseFrequency}
              type="bar"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <VisualizationCard
              title="Patient Demographics"
              data={dashboardData.patientDemographics}
              type="pie"
            />
          </Grid>

          

            {/* Outbreak Alerts
          {dashboardData.diseaseFrequency.map((disease) => (
            <Grid item xs={12} md={4} key={disease.label}>
              <AlertCard disease={disease.label} frequency={disease.value} />
            </Grid>
          ))} */}
        </Grid>
      </div>
      </Box>
  );
}

export default Dashboard;
