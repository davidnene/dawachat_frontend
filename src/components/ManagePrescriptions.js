import React, { useEffect, useState, useRef } from "react";
import {
  getPrescriptions,
  createPrescription,
  updatePrescription,
  deletePrescription,
} from "../services/prescriptionService";
import { getPatients } from "../services/patientService";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Edit, Delete, Add, Visibility, Print } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";

const ManagePrescriptions = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [formData, setFormData] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const printRef = useRef();
  const printAllRef = useRef();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchPrescriptions = async (patientId) => {
    try {
      const data = await getPrescriptions(patientId);
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const handleSelectPatient = (event) => {
    setSelectedPatient(event.target.value);
    fetchPrescriptions(event.target.value);
  };

  /** ✅ Open Edit Modal */
  const handleEditOpen = (prescription) => {
    setFormData({ ...prescription });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setFormData({});
  };

  /** ✅ Open View More Modal */
  const handleViewOpen = (prescription) => {
    setSelectedPrescription(prescription);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setViewOpen(false);
  };

  const handleSubmit = async () => {
    if (!formData.medication || !formData.dosage || !formData.diagnosis) {
      alert("Medication, dosage, and diagnosis are required!");
      return;
    }

    if (!selectedPatient) {
      alert("Please select a patient first!");
      return;
    }

    try {
      const payload = {
        medication: formData.medication,
        dosage: formData.dosage,
        observations: formData.observations || "",
        diagnosis: formData.diagnosis,
        diseases_type: formData.diseases_type || "non_communicable",
        treatment_plan: formData.treatment_plan || "",
        doctor_notes: formData.doctor_notes || "",
      };

      if (formData.id) {
        await updatePrescription(formData.id, payload);
      } else {
        await createPrescription(selectedPatient, payload);
      }

      fetchPrescriptions(selectedPatient);
      handleEditClose();
    } catch (error) {
      console.error("Error submitting prescription:", error.response?.data.detail || error);
      alert("Error submitting prescription:", error.response?.data.detail || error);
    }
};


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deletePrescription(id);
      fetchPrescriptions(selectedPatient);
    } catch (error) {
      console.error("Error deleting prescription:", error);
      alert("Error deleting prescription:", error)
    }
  };

  const handlePrint = useReactToPrint({ content: () => printRef.current });
  const handlePrintAll = useReactToPrint({ content: () => printAllRef.current });

  const columns = [
    { field: "medication", headerName: "Medication", flex: 1 },
    { field: "dosage", headerName: "Dosage", flex: 1 },
    { field: "diagnosis", headerName: "Diagnosis", flex: 1 },
    { 
      field: "created_at", 
      headerName: "Date Created", 
      flex: 1,
      //valueGetter: (params) => new Date(params.value).toLocaleString() // Format the date nicely
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleViewOpen(params.row)} color="secondary">
            <Visibility />
          </Button>
          <Button onClick={() => handleEditOpen(params.row)} color="primary">
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
      <h5>Manage Prescriptions</h5>

      {/* Select Patient */}
      <TextField
        select
        label="Select Patient"
        value={selectedPatient || ""}
        onChange={handleSelectPatient}
        fullWidth
        sx={{ mb: 2 }}
      >
        {patients.map((patient) => (
          <MenuItem key={patient.id} value={patient.id}>
            {patient.name} ({patient.email})
          </MenuItem>
        ))}
      </TextField>

      {/* Buttons */}
      <Button variant="contained" startIcon={<Add />} onClick={() => handleEditOpen({})} disabled={!selectedPatient} sx={{ mb: 2 }}>
        Add Prescription
      </Button>

      <Button
        variant="contained"
        startIcon={<Print />}
        color="secondary"
        onClick={handlePrintAll}
        sx={{ mb: 2, ml: 2 }}
        disabled={prescriptions.length === 0} 
      >
        Print All
      </Button>

      {/* DataGrid Table */}
      <DataGrid rows={prescriptions} columns={columns} autoHeight pageSize={5} disableSelectionOnClick />

      {/* Edit Prescription Modal */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>{formData.id ? "Edit Prescription" : "Add Prescription"}</DialogTitle>
        <DialogContent>
            <TextField label="Medication" fullWidth value={formData.medication || ""} onChange={(e) => setFormData({ ...formData, medication: e.target.value })} sx={{ mb: 2 }} />
            <TextField label="Dosage" fullWidth value={formData.dosage || ""} onChange={(e) => setFormData({ ...formData, dosage: e.target.value })} sx={{ mb: 2 }} />
            <TextField label="Observations" fullWidth value={formData.observations || ""} onChange={(e) => setFormData({ ...formData, observations: e.target.value })} sx={{ mb: 2 }} />
            <TextField label="Diagnosis" fullWidth value={formData.diagnosis || ""} onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })} sx={{ mb: 2 }} />
            <TextField select label="Disease Type" fullWidth value={formData.diseases_type || "non_communicable"} onChange={(e) => setFormData({ ...formData, diseases_type: e.target.value })} sx={{ mb: 2 }}>
                <MenuItem value="communicable">Communicable</MenuItem>
                <MenuItem value="non_communicable">Non-Communicable</MenuItem>
            </TextField>
            <TextField label="Treatment Plan" fullWidth value={formData.treatment_plan || ""} onChange={(e) => setFormData({ ...formData, treatment_plan: e.target.value })} sx={{ mb: 2 }} />
            <TextField label="Doctor Notes" fullWidth multiline rows={3} value={formData.doctor_notes || ""} onChange={(e) => setFormData({ ...formData, doctor_notes: e.target.value })} sx={{ mb: 2 }} />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {formData.id ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Prescription Modal */}
      <Dialog open={viewOpen} onClose={handleViewClose}>
        <DialogTitle>Prescription Details</DialogTitle>
        <DialogContent ref={printRef}>
          {selectedPrescription && (
            <Paper sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6">Prescription Details</Typography>
              <Divider />
              <Typography><strong>Medication:</strong> {selectedPrescription.medication}</Typography>
              <Typography><strong>Dosage:</strong> {selectedPrescription.dosage}</Typography>
              <Typography><strong>Observations:</strong> {selectedPrescription.observations}</Typography>
              <Typography><strong>Diagnosis:</strong> {selectedPrescription.diagnosis}</Typography>
              <Typography><strong>Disease Type:</strong> {selectedPrescription.diseases_type}</Typography>
              <Typography><strong>Treatment Plan:</strong> {selectedPrescription.treatment_plan}</Typography>
              <Typography><strong>Doctor Notes:</strong> {selectedPrescription.doctor_notes || "N/A"}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography><strong>Patient:</strong> {selectedPrescription.patient?.name}</Typography>
              <Typography><strong>Doctor:</strong> {selectedPrescription.doctor?.name}</Typography>
              <Typography><strong>Hospital:</strong> {selectedPrescription.doctor?.hospital?.name}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography><strong>Date:</strong> {selectedPrescription.created_at}</Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewClose}>Close</Button>
          <Button onClick={handlePrint} variant="contained" color="primary">
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManagePrescriptions;
