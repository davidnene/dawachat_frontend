import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
// import { recordAlert } from "../services/alertsService";

function AlertCard({ disease, frequency }) {
  useEffect(() => {
    if (frequency > 10) { // Threshold

    //   recordAlert(disease, frequency);
    }
  }, [frequency, disease]);

  return (
    <Card style={{ backgroundColor: frequency > 10 ? "#ffcccc" : "#f5f5f5" }}>
      <CardContent>
        <Typography variant="h6">Outbreak Alert🚨🚨 {disease}</Typography>
        <Typography>Frequency: {frequency}</Typography>
      </CardContent>
    </Card>
  );
}

export default AlertCard;
