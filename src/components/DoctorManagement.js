import React, { useEffect, useState } from "react";
import { getDoctors, createDoctor, updateDoctor } from "../services/doctorService";
import { Button, TextField, Card, CardContent, Typography, Grid } from "@mui/material";

function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", specialty: "", password: "" });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const data = await getDoctors();
    setDoctors(data);
  };

  const handleSubmit = async () => {
    await createDoctor(formData);
    fetchDoctors();
  };

  return (
    <div className="container mt-5">
      <Typography variant="h4">Manage Doctors</Typography>
      
      {/* Form to Add Doctor */}
      <Grid container spacing={2} className="mt-3">
        <Grid item xs={3}><TextField label="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></Grid>
        <Grid item xs={3}><TextField label="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></Grid>
        <Grid item xs={3}><TextField label="Specialty" onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} /></Grid>
        <Grid item xs={3}><Button onClick={handleSubmit}>Add Doctor</Button></Grid>
      </Grid>

      {/* List of Doctors */}
      {doctors.map((doctor) => (
        <Card key={doctor.id} className="mt-3">
          <CardContent>
            <Typography variant="h6">{doctor.name} - {doctor.specialty}</Typography>
            <Typography variant="body2">{doctor.email}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DoctorManagement;
