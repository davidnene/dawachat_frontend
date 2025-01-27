import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleQueryDosage = () => {
        navigate('/query-dosage');
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Box textAlign="center">
                <Typography variant="h3" gutterBottom>
                    Welcome to the Dosage Dashboard
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Use the tools here to query dosage information and manage prescriptions.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{ marginTop: '1rem' }}
                    onClick={handleQueryDosage}
                >
                    Query Dosage
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
