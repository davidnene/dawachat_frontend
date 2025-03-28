import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { queryDosage } from '../services/queryService'; 

const QueryDosagePage = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);

    // Function to handle query submission
    const handleSendMessage = async () => {
        if (!query.trim()) return;

        // Append the user's query to messages
        setMessages((prevMessages) => [...prevMessages, { type: 'question', text: query }]);
        
        // Clear the input
        setQuery('');

        try {
            // Get the response from the backend
            const response = await queryDosage(query);
            // Append the response to messages
            setMessages((prevMessages) => [...prevMessages, { type: 'response', text: response }]);
        } catch (error) {
            console.error('Failed to get dosage information:', error);
            setMessages((prevMessages) => [...prevMessages, { type: 'response', text: 'Error retrieving response. Please try again later.' }]);
        }
    };

    return (
        <Container maxWidth="md" className="mt-5">
            <Typography variant="h5" align="center" gutterBottom color="textSecondary">
                Dosage Query Chat
            </Typography>
            <Paper elevation={3} style={{ padding: '1rem', maxHeight: '70vh', overflowY: 'auto' }}>
                <List>
                    {messages.map((message, index) => (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={message.type === 'question' ? 'Doctor' : 'Dosage System'}
                                    secondary={message.text}
                                    style={{
                                        textAlign: message.type === 'question' ? 'right' : 'left',
                                        color: message.type === 'question' ? 'blue' : 'green',
                                    }}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
            <Box display="flex" alignItems="center" mt={2}>
                <TextField
                    label="Ask a question about dosage"
                    variant="outlined"
                    fullWidth
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    style={{ marginLeft: '1rem' }}
                >
                    Send
                </Button>
            </Box>
        </Container>
    );
};

export default QueryDosagePage;
