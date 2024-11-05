import api from './api';

export const loginUser = async (email, password) => {
    const response = await api.post('/api/login', { email, password });
    const { access_token } = response.data;
    
    // Store the token in localStorage
    localStorage.setItem('token', access_token);
    
    return response.data;
};
