import api from "./api";

export const createPatient = async (patientData) => {
  return await api.post("/api/create-patient/", patientData);
};

export const getPatients = async () => {
  const response = await api.get("/api/patients/");
  return response.data;
};

export const updatePatient = async (patientId, patientData) => {
  return await api.put(`/api/update-patient/${patientId}`, patientData);
};

export const deletePatient = async (patientId, patientData) => {
  return await api.delete(`/api/delete-patient/${patientId}`, patientData);
};
