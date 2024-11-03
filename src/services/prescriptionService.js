import api from './api';

export const createPrescription = async (prescriptionData) => {
    const response = await api.post('/api/prescribe', prescriptionData);
    return response.data;
};
