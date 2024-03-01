import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import data from '../assets/markets.json';
import { Tooltip } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CurrCard({ coinData, coinID }) {

    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function addToWallet() {

        let myCoins = JSON.parse(localStorage.getItem('MyCoins'));

        if (!myCoins) {
            myCoins = [];
        }

        if (localStorage.getItem('MyCoins')) {
            if (!myCoins.some(e => e.id == coinData[coinID].id)) {
                myCoins.push(coinData[coinID])
                localStorage.setItem('MyCoins', JSON.stringify(myCoins))
            } else {
                alert('Coin allready exists!')
            }
        } else {
            myCoins.push(coinData[coinID])
            localStorage.setItem('MyCoins', JSON.stringify(myCoins));
        }

        handleClose();
    }

    return (
        <Card sx={{ width: '100%', mb: 2 }} margin={'auto'} justifyContent='center'>
            <CardHeader
                title={<>
                    <h1 >{coinData[coinID].name}</h1>
                </>}
                avatar={
                    < Avatar sx={{ backgroundRepeat: 'no-repeat', }} aria-label='recipe' src={coinData[coinID].image} />
                }
            >
            </CardHeader>
            < CardActions disableSpacing>
                <IconButton aria-label='add to favorites' >
                    <Tooltip title='Add to My Coins' >
                        <React.Fragment >
                            <FavoriteTwoToneIcon onClick={handleClickOpen} sx={{ color: '#AB003C' }} />
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby='alert-dialog-title'
                                aria-describedby='alert-dialog-description'
                            >
                                <DialogTitle id='alert-dialog-title'>
                                    {'Add coin to My Wallet?'}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id='alert-dialog-description'>
                                        Are you sure you want to add this coin to your wallet?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>

                                    <Button sx={{ color: '#AB003C' }} onClick={() => addToWallet()} autoFocus>
                                        Yes
                                    </Button>
                                    <Button sx={{ color: '#AB003C' }} onClick={handleClose}>No</Button>
                                </DialogActions>
                            </Dialog>
                        </React.Fragment>
                    </Tooltip>
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </ CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <Typography variant='middle' textAlign='left' ><b>Current price: {data[coinID].current_price} </b></Typography>
                    <br></br>
                    <Typography variant='middle' textAlign='center' ><b>Market Cap: {data[coinID].market_cap}</b> </Typography>
                    <br></br>
                    <Typography variant='middle' textAlign='right' ><b>Circulating_supply: {data[coinID].circulating_supply} </b></Typography>
                </CardContent>
            </Collapse>
        </Card >
    );
}

