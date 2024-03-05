import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import Logout from './Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    // const [anchorNavUser, setAnchorNavUser] = React.useState(null);

    let username = JSON.parse(localStorage.getItem("currentUser")).Username

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function MyWallet() {
        window.location.href = '/my-wallet'
    }

    function AssetPlatforms() {
        window.location.href = '/asset-platforms'
    }

    function Cryptocurrencies() {
        window.location.href = '/crypto-currencies'
    }

    function HomePage() {
        window.location.href = '/home-page'
    }

    return (
        <AppBar position="static">
            <Container maxWidth="100%"
                sx={{
                    backgroundColor: "#AB003C",
                }}
            >
                <Toolbar sx={{ p: 0 }}>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/home-page"
                        sx={{
                            fontFamily: "Roboto",
                            width: "15%",
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            '@media (max-width: 900px)': {
                                width: "50%",
                            },
                            '@media (max-width: 510px)': {
                                width: "60%",
                            },
                        }}
                    >
                        Crypto App
                    </Typography>
                    <Box sx={{
                        display: { md: 'flex', float: "left", width: "75%", justifyContent: "center" }, '@media (max-width: 900px)': {
                            display: 'none',
                        },
                    }}>
                        <Button
                            key={"HomePage"}
                            onClick={HomePage}
                            sx={{
                                color: 'white', display: 'block', boxShadow: 0, mr: 3, ":hover": {
                                    color: "lightgray",
                                }, '@media (max-width: 900px)': {
                                    display: 'none',
                                },
                            }}
                        >
                            Home Page
                        </Button>

                        <Button
                            key={"AssetPlatforms"}
                            onClick={AssetPlatforms}
                            sx={{
                                color: 'white', display: 'block', boxShadow: 0, mr: 3, ":hover": {
                                    color: "lightgray",
                                }, '@media (max-width: 900px)': {
                                    display: 'none',
                                },
                            }}
                        >
                            Asset Platforms
                        </Button>

                        <Button
                            key={"Cryptocurrencies"}
                            onClick={Cryptocurrencies}
                            sx={{
                                color: 'white', display: 'block', boxShadow: 0, mr: 3, ":hover": {
                                    color: "lightgray",
                                }, '@media (max-width: 900px)': {
                                    display: 'none',
                                },
                            }}
                        >
                            Cryptocurrencies
                        </Button>
                    </Box>
                    {username}
                    <Container sx={{ width: "1%" }}>
                        <Box sx={{ flexGrow: 0, width: "30%" }}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleOutlinedIcon fontSize='large' sx={{ color: "white", }} />
                            </IconButton>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >

                                <MenuItem key={"My Wallet"} onClick={function (event) { handleCloseUserMenu; MyWallet() }}>
                                    <Typography textAlign="center">My Coins</Typography>
                                </MenuItem>



                                {/* ///////////////////////////////////////////////////////*/}

                                <Box sx={{
                                    '@media (max-width: 900px)': {
                                        display: 'block',
                                    },
                                    '@media (min-width: 900px)': {
                                        display: 'none',
                                    },
                                }}>
                                    <MenuItem key={"HomePage"} onClick={HomePage}>
                                        <Typography textAlign="center">Home Page</Typography>
                                    </MenuItem>

                                    <MenuItem key={"AssetPlatforms"} onClick={AssetPlatforms}>
                                        <Typography textAlign="center">Asset Platforms</Typography>
                                    </MenuItem>

                                    <MenuItem key={"Cryptocurrencies"} onClick={Cryptocurrencies}>
                                        <Typography textAlign="center">Cryptocurrencies</Typography>
                                    </MenuItem>
                                </Box>
                                {/* ///////////////////////////////////////////////////////*/}

                                <MenuItem key={"LogOut"} onClick={function (event) { handleCloseUserMenu; Logout(); }}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>

                            </Menu>
                        </Box>
                    </Container>
                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default ResponsiveAppBar;