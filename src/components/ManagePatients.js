import React, { useEffect, useState } from "react";
import { getPatients, createPatient, updatePatient, deletePatient } from "../services/patientService";
import { Button, TextField, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete, Add } from "@mui/icons-material";

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: "", email: "" });
  const [open, setOpen] = useState(false); // Controls modal visibility

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  // Open Modal for Creating/Editing Patient
  const handleOpen = (patient = null) => {
    if (patient) {
      setFormData(patient); // Set existing patient data for editing
    } else {
      setFormData({ id: null, name: "", email: "" }); // Reset form for new patient
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        await updatePatient(formData.id, formData); // Update existing patient
      } else {
        await createPatient(formData); // Create new patient
      }
      fetchPatients();
      handleClose();
    } catch (error) {
      console.error("Error submitting patient data:", error.response?.data || error);
      alert("Failed to save patient. Check input values.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      fetchPatients();
    } catch (error) {
      console.error("Error deleting patient:", error.response?.data || error);
      alert("Failed to delete patient.");
    }
  };

  // DataGrid Column Configuration
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleOpen(params.row)} color="primary">
            <Edit />
          </Button>
          <Button onClick={() => handleDelete(params.row.id)} color="error">
            <Delete />
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <h2>Manage Patients</h2>

      {/* Add Patient Button */}
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add Patient
      </Button>

      {/* DataGrid Table */}
      <DataGrid
        rows={patients}
        columns={columns}
        autoHeight
        pageSize={5}
        disableSelectionOnClick
      />

      {/* Modal for Creating/Editing Patient */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formData.id ? "Edit Patient" : "Add Patient"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {formData.id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManagePatients;
