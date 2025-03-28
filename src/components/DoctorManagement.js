import React, { useEffect, useState, useContext } from "react";
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from "../services/doctorService";
import { Button, TextField, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete, Add } from "@mui/icons-material";
import AuthContext from "../context/AuthContext";

const DoctorManagement = () => {
  const { user, } = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: "", email: "", specialty: "", password: "" });
  const [open, setOpen] = useState(false); // Controls modal visibility

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const data = await getDoctors();
    setDoctors(data);
  };

  // Open Modal for Creating/Editing Doctor
  const handleOpen = (doctor = null) => {
    if (doctor) {
      setFormData(doctor); // Set existing doctor data for editing
    } else {
      setFormData({ id: null, name: "", email: "", specialty: "", password: "" }); // Reset form for new doctor
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.specialty || !formData.password) {
      alert("All fields are required!");
      return;
    }
  
    try {
      if (!user || user.role !== "admin") {
        alert("Unauthorized. Only admins can create doctors.");
        return;
      }
  
      const payload = {
        name: formData.name,
        email: formData.email,
        specialty: formData.specialty,
        password: formData.password,
        role: "doctor",
      };
  
      if (formData.id) {
        await updateDoctor(formData.id, payload); 
      } else {
        await createDoctor(payload);
      }
  
      fetchDoctors();
      handleClose();
    } catch (error) {
      console.error("Error submitting doctor data:", error.response?.data || error);
      alert("Failed to save doctor. Check input values.");
    }
  };
  

  const handleDelete = async (id) => {
    await deleteDoctor(id);
    fetchDoctors();
  };

  // DataGrid Column Configuration
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "specialty", headerName: "Specialty", flex: 1 },
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
      <h2>Manage Doctors</h2>

      {/* Add Doctor Button */}
      <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add Doctor
      </Button>

      {/* DataGrid Table */}
      <DataGrid
        rows={doctors}
        columns={columns}
        autoHeight
        pageSize={5}
        disableSelectionOnClick
      />

      {/* Modal for Creating/Editing Doctor */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{formData.id ? "Edit Doctor" : "Add Doctor"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField label="Name" fullWidth value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></Grid>
            <Grid item xs={12}><TextField label="Email" fullWidth value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></Grid>
            <Grid item xs={12}><TextField label="Specialty" fullWidth value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} /></Grid>
            {!formData.id && (
              <Grid item xs={12}>
                <TextField label="Password" type="password" fullWidth value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">{formData.id ? "Update" : "Save"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DoctorManagement;
