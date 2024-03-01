import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { redirect } from "react-router-dom";
// import * as React from 'react';
import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from '@mui/material/Alert';
import { Avatar } from "@mui/material";

// primary: {
//     main: '#82dcf4',
// },
// secondary: {
//     main: '#AB003C',
// },
// info: {
//     main: '#0288d1',
// },
// error: {
//     main: '#e2002d',
// },
// warning: {
//     main: '#471372',
// },



export default function LoginPrompt() {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("Error");

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData;

        if (data != undefined && localStorage.getItem("currentUser") != null) {

            data = new FormData(event.currentTarget);

            const enteredPassword = data.get("password");
            const enteredEmail = data.get("email");

            let currentUser = JSON.parse(localStorage.getItem("currentUser"))

            if ((enteredEmail != currentUser.Email) || (enteredEmail == null) || (enteredPassword != currentUser.Password) || (enteredPassword == null)) {
                setMessage("Invalid email or password!");
                return
            } else {
                localStorage.setItem("token", JSON.stringify(true))
                window.location.href = 'home-page'
            }
        }
    }

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );



    return (
        <Container component="main" maxWidth="xs">

            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <Avatar sx={{ m: 1, bgcolor: "#AB003C" }}>
                </Avatar>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        onClick={handleClick}
                        fullWidth
                        variant="contained"
                        bgcolor="#AB003C"
                        sx={{
                            bgcolor: "#AB003C",
                            mt: 3, mb: 2, ":hover": {
                                bgcolor: "black",

                            }
                        }}
                    >
                        Log in
                    </Button>

                    <Grid item container justifyContent="center"  >
                        <Link href={`signup`} underline="hover" sx={{ color: "#AB003C" }}>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Box>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </Container >
    );
}