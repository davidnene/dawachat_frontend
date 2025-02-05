import api from "./api";

export const getPatients = async () => {
  const response = await api.get("/api/patients/");
  return response.data;
};

export const updatePatient = async (patientId, patientData) => {
  return await api.put(`/api/update-patient/${patientId}`, patientData);
};
