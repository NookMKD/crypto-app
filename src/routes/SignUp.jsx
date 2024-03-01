import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Navigate } from "react-router-dom";

const theme = createTheme();


export default function SignUp() {
    const [snackPack, setSnackPack] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const [message, setMessage] = React.useState("Error");

    const handleClick = (message) => {
        setMessage(message)
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSignUp = (event) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // const data = new FormData(event.currentTarget);
        const password = data.get('password');
        const confirmPassword = data.get('confirmPassword')
        const username = data.get("username");
        const email = data.get("signUpEmail");
        // console.log(password.length);

        if (username.length == 0) {
            handleClick(`Username field can't be empty`);
        } else {
            if (email.length == 0) {
                handleClick(`Email field can't be empty`);
            } else {
                if (password.length == 0) {
                    handleClick('Password length must be 1 or more characters');
                } else {
                    if (password != confirmPassword) {
                        handleClick('Passwords do not match!')
                    } else {
                        let currUser = {
                            "Username": username,
                            "Password": password,
                            "Email": email
                        };
                        localStorage.clear();
                        localStorage.setItem("currentUser", JSON.stringify(currUser))
                        localStorage.setItem("currentUser", JSON.stringify(currUser))
                        localStorage.setItem("MyCoins", JSON.stringify([]))
                        localStorage.setItem("isSignedUp", JSON.stringify(true));
                        localStorage.setItem("token", JSON.stringify(false))
                        window.location.href = '/LogIn'
                    }
                }
            }
        };
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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "#AB003C" }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSignUp}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="signUpEmail"
                                    label="Email Address"
                                    name="signUpEmail"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="signUpPassword"
                                    autoComplete="new-password"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmpassword"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
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
                            Sign Up
                        </Button>
                        <Grid item container justifyContent="center"  >

                            <Link href={`login`} underline="hover" sx={{ color: "#AB003C" }} >
                                Already have an account? Log in
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
            </Container>
        </ThemeProvider >
    );
}