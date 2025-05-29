import api from './api';

export const queryDosage = async (query) => {
    const response = await api.post('/api/query-dosage/', {"query": `${query}`});
    return response.data.response.content;
};

export const createPrescription = async (prescriptionData) => {
  return await api.post("/api/prescribe/", prescriptionData);
};

export const getPrescriptions = async () => {
  const response = await api.get("/api/prescriptions/");
  return response.data;
};

