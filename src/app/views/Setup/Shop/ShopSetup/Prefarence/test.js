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

export default function SelectPrinter() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    let list =[]
    if (BrowserWindow) {
        let printWindow = new BrowserWindow({ 'auto-hide-menu-bar': true, show: false });
        list = printWindow.webContents.getPrinters();
        // console.log(list)
    }
    console.log(checked)
    return (
        <List dense className={classes.root}>
            {list.map((printer, key) => {
                const labelId = `checkbox-list-secondary-label-${printer.name}`;
                return (
                    <ListItem key={key} button>
                        <ListItemAvatar>
                            <Avatar>
                                <PrintIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={`${printer.name}`} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                edge="end"
                                onChange={handleToggle(printer)}
                                checked={checked.indexOf(printer) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}
