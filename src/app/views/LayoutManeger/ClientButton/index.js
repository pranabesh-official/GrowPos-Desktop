import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeLite , ThemeDark, success , secondary, warning, danger , info} from '../../LayoutManeger/Themes'
import table from './dinner.png'
import delivery from './food-delivery.png'
import takeAway from './take-away.png'
import Button from '@material-ui/core/Button';


const getStatus= (status) => {
    switch (status) {
        case 'Active': return success
        case 'Inactive': return secondary
        case 'Pending': return warning
        case 'Banned': return danger
        default: return info
    }
}
const useStyles = makeStyles(theme => ({
    logo: {
        height: '35px' ,
        width: '30px' 
    },
    buttonStatus: props=> {
        const color = getStatus(props.status)
        return{
            // margin: theme.spacing(0.5),
            borderBottom: `5px solid ${color}`,
            maxWidth:props.size,
        }
    }
    
}))


const StyledButton = withStyles({
    root: {
        background: ThemeLite,
        borderRadius: 0,
        color: 'white',
        height: 48,
        padding: '0 0px',
        margin: '1px',
        "&:hover": {
            backgroundColor: ThemeDark,

            "@media (hover: none)": {
                backgroundColor: ThemeDark
            }
        }
    },
    label: {
        textTransform: 'capitalize',
    },

})(Button);

export default function ClientButton(props) {
    const classes = useStyles(props);
    const { onClick, label , Type , } = props
    const getType= (Type) => {
        switch (Type) {
            case 'Table': return table
            case 'Delivery': return delivery
            case 'TakeAway': return takeAway
            default: return takeAway
        }
    }
    let key = 0
    const keygen = () => {
        key = key + 1
        return key
    }
    return (
        <StyledButton
        className={classes.buttonStatus}
        startIcon={<img src={getType(Type)} alt="" className={classes.logo}/>}
        onClick={onClick}
        fullWidth
        key={keygen()}
        >
            {label}
        </StyledButton>
    );
}