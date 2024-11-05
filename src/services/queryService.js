import api from './api';

export const queryDosage = async (query) => {
    const response = await api.post('/api/query-dosage', {"query": `${query}`});
    return response.data.response.content;
};
