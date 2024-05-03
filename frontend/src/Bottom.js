import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';

function Bottom() {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <React.Fragment>
            <AppBar position="static" color="primary">
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Button variant="outlined" style={{ color: 'white', borderColor: 'white', borderRadius: '100px', marginRight: '5em' }} onClick={handleOpenDialog}>Leave a feedback</Button>
                    <div>
                        <Typography variant="h5">Contact Us</Typography>
                        <IconButton aria-label="instagram" style={{ color: 'white' }}> <InstagramIcon style={{ fontSize: '1.5em' }} /></IconButton>
                        <IconButton aria-label="telegram" style={{ color: 'white' }}> <TelegramIcon style={{ fontSize: '1.5em' }} /></IconButton>
                        <IconButton aria-label="facebook" style={{ color: 'white' }}> <FacebookIcon style={{ fontSize: '1.5em' }} /></IconButton>
                        <Typography variant="h6">+380662410786</Typography>
                    </div>
                </Toolbar>
            </AppBar>
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle>Leave Feedback</DialogTitle>
                <DialogContent>
                <TextField autoFocus margin="dense" id="feedback" name="feedback" label="Your Feedback" type="text" fullWidth variant="standard"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button type="send">Send</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default Bottom;
