import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            login(response.data.access_token);
            history.push('/dashboard');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '2rem' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" gutterBottom>
                    Doctor Login
                </Typography>
                {error && <Alert severity="error" style={{ marginBottom: '1rem' }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1rem' }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;
