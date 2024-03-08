import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const SharePopup = ({ open, closePopUp ,handleAddShareConfirm}) => {


    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={closePopUp}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Confirm User Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are You Sure ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="small" onClick={handleAddShareConfirm}>OK</Button>
                    <Button size="small" className="cancel_btn" onClick={closePopUp}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}





