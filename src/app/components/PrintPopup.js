import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography,  DialogActions } from '@material-ui/core';
import Controls from "./controls/Controls";
import CloseIcon from '@material-ui/icons/Close';
import PrintIcon from '@material-ui/icons/Print';
const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(0),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        padding: 0
    },
    content: {
        padding: 8,
        margin: 0,
        maxHeight:400
    },
    newButton: {
        position: 'absolute',
        right: '10px',
        bottom: '10px'
    },
    contentBody: {
        ...theme.GlobalBox,
        background: '#00000000',
        maxHeight: 600,
    }
}))

export default function PrintPopup(props) {

    const { title, children, openPrintPopup, setOpenPrintPopup, handlePrint } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPrintPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, margin: 5 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={() => { setOpenPrintPopup(false) }}>
                        <CloseIcon fontSize="inherit" />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers className={classes.content}>
                {children}
            </DialogContent>
            <DialogActions>
                <Controls.Button
                    text="Print"
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    // className={classes.newButton}
                    onClick={()=>{handlePrint()}}
                />
            </DialogActions>
        </Dialog>
    )
}
