import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BrainCog, ShieldCheck, FileText, Activity, Stethoscope, AlertCircle } from 'lucide-react';
import Footer from '../components/Footer';

const features = [
    {
        title: 'AI-Powered Dosage Assistant',
        description: 'Leverages LLMs and the Kenya National Medicine Formulary via knowledge graphs to assist doctors in prescribing accurate, context-aware drug dosages.',
        icon: <BrainCog size={32} />,
    },
    {
        title: 'Integrated Prescription History',
        description: 'Doctors can view a patient\'s complete prescription history, including records from other hospitals for better-informed care.',
        icon: <FileText size={32} />,
    },
      
    {
        title: 'Smart Prescription Management',
        description: 'Full prescription lifecycle: creation, updates, deletion, and visualization.',
        icon: <Stethoscope size={32} />,
    },
    {
        title: 'Stress Monitoring System',
        description: 'Uses real-time wearable data to flag stress levels and alerts hospital admin for action.',
        icon: <Activity size={32} />,
    },
    {
        title: 'Secure Role-based Access',
        description: 'Scoped access for Super Admins, Admins, and Doctors ensures data integrity and user accountability.',
        icon: <ShieldCheck size={32} />,
    },
    {
        title: 'Alert System',
        description: 'Automatic logging and alerts when doctors are under stress.',
        icon: <AlertCircle size={32} />,
    },
];

const HomePage = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/login');
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
            minHeight: '50vh',
            textAlign: 'center',
            backgroundColor: '#1976d2', // Material UI primary blue
            color: '#fff', // white text
            px: 3, // padding left & right
            py: 6, // padding top & bottom
        }}
        >
        <Typography variant="h2" gutterBottom>
            Welcome to dawaChat
        </Typography>
        <Typography variant="h5" sx={{ color: '#e3f2fd', mb: 4 }}>
            A powerful tool to help doctors manage dosage information and prescriptions with ease.
        </Typography>
        <Button variant="contained"  size="large" onClick={goToDashboard} sx={{
  backgroundColor: '#1abc9c',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#16a085',
  },
}}
>
            Get Started
        </Button>
        </Box>


        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 8 }}>
          Key Features
        </Typography>

        <Grid container spacing={4} sx={{ background: 'linear-gradient(135deg, #e3f2fd, #fff)', py: 6, px: 3 }}>
        {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
                elevation={6}
                sx={{
                p: 2,
                minHeight: 240,
                textAlign: 'center',
                borderRadius: 4,
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                },
                }}
            >
                <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    {React.cloneElement(feature.icon, {
                    fontSize: 'large',
                    style: { color: '#1abc9c' }, // Customize icon color
                    })}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ color: '#0d47a1' }}>
                    {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                </Typography>
                </CardContent>
            </Card>
            </Grid>
        ))}
        </Grid>

      </Container>

      <Footer />
    </>
  );
};

export default HomePage;
