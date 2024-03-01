import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function Error() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Grid >
                        <Typography variant="h1">
                            404
                        </Typography>
                        <Typography variant="h6">
                            The page you’re looking for doesn’t exist.
                        </Typography>
                        <Button href='login' variant="contained">Back Home</Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}