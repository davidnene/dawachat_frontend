import api from "./api";

// Fetch prescriptions for a specific patient
export const getPrescriptions = async (patientId) => {
  const response = await api.get(`/api/prescriptions/${patientId}`);
  return response.data;
};

// Create a new prescription
export const createPrescription = async (patientId, prescriptionData) => {
  return await api.post(`/api/create-prescription/?patient_id=${patientId}`, prescriptionData);
};

// Update an existing prescription
export const updatePrescription = async (prescriptionId, updatedData) => {
  return await api.put(`/api/update-prescription/${prescriptionId}`, updatedData);
};

// Delete a prescription
export const deletePrescription = async (prescriptionId) => {
  return await api.delete(`/api/delete-prescription/${prescriptionId}`);
};
