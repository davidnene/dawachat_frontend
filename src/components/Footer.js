// Footer.jsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => (
  <Box component="footer" bgcolor="primary.main" color="white" py={4} textAlign="center">
    <Typography variant="h6">dawaChat</Typography>
    <Typography>A powerful tool to help doctors manage dosage information and prescriptions with ease.</Typography>
    <Typography>📧 <Link href="mailto:info@dawachat.ai" color="inherit">info@dawachat.ai</Link></Typography>
    <Typography>📍 Nairobi, Kenya</Typography>
  </Box>
);

export default Footer;
