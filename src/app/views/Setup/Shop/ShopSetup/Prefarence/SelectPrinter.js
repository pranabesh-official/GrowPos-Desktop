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
if (isElectron) {
    var { BrowserWindow } = window.require('electron').remote
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SelectPrinter({getPrinter}) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    let PrinterNames =['Plese Download App']
    if (BrowserWindow) {
        PrinterNames =[]
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

        setChecked(newChecked);
        getPrinter(newChecked)
    };
    
    return (
        <List dense className={classes.root}>
            {PrinterNames.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    <ListItem key={value} button>
                        <ListItemAvatar>
                            <Avatar>
                                <PrintIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={` ${value }`} />
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
    );
}
