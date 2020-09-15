import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeLite, ThemeDark, success,  danger, info , warning } from '../../LayoutManeger/Themes'
import Button from '@material-ui/core/Button';
import { Icon } from 'semantic-ui-react'

const getStatus = (status) => {
    switch (status) {
        case 'Active': return success
        case 'Inactive': return info
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
    const { onClick, label , loading} = props
    return (
        <StyledButton
            className={classes.buttonStatus}
            onClick={onClick}
            startIcon={loading && <Icon loading name='spinner'  size="small" style={{color:getStatus(props.status)}} />}
            // fullWidth
            // key={keygen()}
        >
            {label}
        </StyledButton>
    );
}