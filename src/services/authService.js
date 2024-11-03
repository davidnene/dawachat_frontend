import api from './api';

export const loginUser = async (email, password) => {
    const response = await api.post('/api/login', { email, password });
    return response.data;
};
