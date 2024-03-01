import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function SaveCoinDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }; const handleCloseAgree = () => {
        addToWallet()
        setOpen(false);
    };

    function addToWallet() {

        let myCoins = JSON.parse(localStorage.getItem("MyCoins"));
        if (!myCoins) {
            myCoins = [];
        }
        // if (localStorage.getItem("MyCoins")) {
        myCoins.push(data[coinID])
        if (!JSON.parse(localStorage.getItem("MyCoins")).includes(data[coinID])) {
            localStorage.setItem("MyCoins", JSON.stringify(myCoins))
        }
        // } else {
        //     localStorage.setItem("MyCoins", JSON.stringify(myCoins));
        // }
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                <FavoriteIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleCloseAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}