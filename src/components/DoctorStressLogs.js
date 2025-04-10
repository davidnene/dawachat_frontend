// src/components/DoctorStressLogs.js
import React, { useEffect, useState, useContext } from "react";
import { getTodayDoctorStressLogs } from "../services/doctorStressLogsService";
import {Typography, Paper, Box, CircularProgress, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AuthContext from "../context/AuthContext";

const DoctorStressLogs = () => {
  const { user } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.role === "admin") fetchLogs();
  }, [user]);

  const fetchLogs = async () => {
    try {
      const data = await getTodayDoctorStressLogs();
      setLogs(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch stress logs.");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "doctor_name", headerName: "Doctor Name", flex: 1 },
    {
      field: "stress_level",
      headerName: "Stress Level",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value.toUpperCase()}
          color={
            params.value === "severe"
              ? "error"
              : params.value === "mild"
              ? "warning"
              : "default"
          }
        />
      ),
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 1,
      // valueFormatter: (params) =>
      //   moment(params.value).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Today's Doctor Stress Logs
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : logs.length === 0 ? (
        <Typography>No stress logs found today.</Typography>
      ) : (
        <Box sx={{ height: 500, mt: 2 }}>
          <DataGrid
            rows={logs}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            disableSelectionOnClick
            getRowId={(row) => row.id}
          />
        </Box>
      )}
    </Paper>
  );
};

export default DoctorStressLogs;
