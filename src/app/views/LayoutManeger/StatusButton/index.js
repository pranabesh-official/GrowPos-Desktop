import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeLite, ThemeDark, success, secondary, warning, danger, info  } from '../../LayoutManeger/Themes'
import Button from '@material-ui/core/Button';


const getStatus = (status) => {
    switch (status) {
        case 'Active': return success
        case 'Inactive': return secondary
        case 'Pending': return warning
        case 'Banned': return danger
        default: return info
    }
}

const useStyles = makeStyles(theme => ({
    buttonStatus: props => {
        const color = getStatus(props.status)
        return {
            margin: theme.spacing(0.5),
            borderBottom: `5px solid ${color}`,
            // maxWidth: props.size,
        }
    }

}))


const StyledButton = withStyles({
    root: {
        background: ThemeDark,
        borderRadius: 0,
        color: 'white',
        height: 48,
        minWidth:70,
        padding: '0 0px',
        "&:hover": {
            backgroundColor: ThemeLite,

            "@media (hover: none)": {
                backgroundColor: ThemeLite
            }
        }
    },
    label: {
        textTransform: 'capitalize',
    },

})(Button);

export default function Statusbutton(props) {
    const classes = useStyles(props);
    const { onClick, label} = props
    // let key = 0
    // const keygen = () => {
    //     key = key + 1
    //     return key
    // }
    return (
        <StyledButton
            className={classes.buttonStatus}
            onClick={onClick}
            // fullWidth
            // key={keygen()}
        >
            {label}
        </StyledButton>
    );
}