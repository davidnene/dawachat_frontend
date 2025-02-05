import React, { useEffect, useState } from "react";
import { getPatients, updatePatient } from "../services/patientService";
import { Button, TextField, Card, CardContent, Typography, Grid } from "@mui/material";

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };

  const handleUpdate = async (patientId) => {
    await updatePatient(patientId, formData);
    fetchPatients();
    setEditingPatient(null);
  };

  return (
    <div className="container mt-5">
      <Typography variant="h4">Patients</Typography>

      {patients.map((patient) => (
        <Card key={patient.id} className="mt-3">
          <CardContent>
            <Typography variant="h6">{patient.name} ({patient.email})</Typography>
            <Typography variant="body2">Prescriptions: {patient.prescriptions.length}</Typography>

            {editingPatient === patient.id ? (
              <Grid container spacing={2} className="mt-3">
                <Grid item xs={3}><TextField label="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></Grid>
                <Grid item xs={3}><Button onClick={() => handleUpdate(patient.id)}>Save</Button></Grid>
              </Grid>
            ) : (
              <Button onClick={() => setEditingPatient(patient.id)}>Edit</Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PatientList;
