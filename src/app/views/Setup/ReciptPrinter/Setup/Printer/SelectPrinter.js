import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import PrintIcon from '@material-ui/icons/Print';
import { isElectron } from 'react-device-detect'
import { Grid } from '@material-ui/core';
import Controls from "../../../../../components/controls/Controls";
import AddIcon from '@material-ui/icons/Add';
if (isElectron) {
    var { BrowserWindow } = window.require('electron').remote
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: "#0000000",
    },
    // newButton: {
    //     position: 'absolute',
    //     right: '10px'
    // },
}));

export default function SelectPrinter({ values, setValues, setOpenPopup }) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    let PrinterNames = ['Plese Download App']
    if (BrowserWindow) {
        PrinterNames = []
        let printWindow = new BrowserWindow({ 'auto-hide-menu-bar': true, show: false });
        let list = printWindow.webContents.getPrinters();
        list.forEach(element => {
            PrinterNames.push(element.name)
        })

    }
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);

        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(value);
        setValues({
            ...values,
            printerName: value
        })
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
                <List dense className={classes.root}>
                    {PrinterNames.map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                            <ListItem key={value} button  >
                                <ListItemAvatar>
                                    <Avatar sizes='small' >
                                        <PrintIcon fontSize='inherit' />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText id={labelId} primary={` ${value}`} />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        onChange={handleToggle(value)}
                                        checked={checked.indexOf(value) !== -1}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Controls.Button
                    variant="outlined"
                    text={'Done'}
                    startIcon={<AddIcon />}
                    className={classes.newButton}
                    onClick={()=>setOpenPopup(false)}
                />
            </Grid>
        </Grid>
    );
}
