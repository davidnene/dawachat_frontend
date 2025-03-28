import React, { useState } from "react";
import { createPrescription } from "../services/prescriptionService";
import { Button, TextField, Typography } from "@mui/material";

function PrescriptionForm() {
  const [formData, setFormData] = useState({
    patientId: "",
    medication: "",
    dosage: "",
    diagnosis: "",
  });

  const handleSubmit = async () => {
    await createPrescription(formData);
    alert("Prescription added!");
  };

  return (
    <div className="container mt-5">
      <Typography variant="h4">Add Prescription</Typography>

      <TextField label="Patient ID" onChange={(e) => setFormData({ ...formData, patientId: e.target.value })} />
      <TextField label="Medication" onChange={(e) => setFormData({ ...formData, medication: e.target.value })} />
      <TextField label="Dosage" onChange={(e) => setFormData({ ...formData, dosage: e.target.value })} />
      <TextField label="Diagnosis" onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })} />

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

export default PrescriptionForm;
