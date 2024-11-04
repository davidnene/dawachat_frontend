import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    const goToDashboard = () => {
        navigate('/login'); 
    };

    return (
        <Container maxWidth="md" className="text-center mt-5">
            <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center"
                style={{ minHeight: '80vh' }}
            >
                <Typography variant="h2" gutterBottom className="display-4">
                    Welcome to Dawa Chat
                </Typography>
                <Typography variant="h5" className="lead text-muted mb-4">
                    A powerful tool to help doctors manage dosage information and prescriptions with ease.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    onClick={goToDashboard}
                    className="mt-3"
                >
                    Get Started
                </Button>
            </Box>
        </Container>
    );
};

export default HomePage;
