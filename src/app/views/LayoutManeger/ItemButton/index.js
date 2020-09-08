import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeLite, light, success, secondary, warning, danger, dark } from '../../LayoutManeger/Themes'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';

const getStatus = (status) => {
    switch (status) {
        case 'Active': return success
        case 'Inactive': return secondary
        case 'Pending': return warning
        case 'Banned': return danger
        default: return success
    }
}

const useStyles = makeStyles(theme => ({
    details: {
        display: 'flex',
        // flexDirection: 'column',
        height: 'auto',
    },
    content: {
        flex: '1 0 auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(12),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: light,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(10),
        color: success,

    },
    logo: () => {
        return {
            width: '30%',
            padding: '2px'
        }
    },
    buttonStatus: props => {
        const color = getStatus(props.status)
        return {
            borderBottom: `1px solid ${color}`,
            maxWidth: '100%',
            minheight: 30,
        }
    }

}))


const StyledButton = withStyles({
    root: {
        display: 'flex',
        background: dark,
        borderRadius: 0,
        padding: '0 0px',
        margin: '2px',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'initial',
        "&:hover": {
            backgroundColor: ThemeLite,

            "@media (hover: none)": {
                backgroundColor: ThemeLite
            }
        }
    },
    // cardAction: {

    // }
})(Card);

export default function ItemButton(props) {
    const classes = useStyles(props);
    const { onClick, label, amount } = props
    let key = 0
    const keygen = () => {
        key = key + 1
        return key
    }
    return (
        <StyledButton className={classes.buttonStatus} key={keygen()} >
            <ButtonBase
                onClick={onClick}
            >
                <CardContent className={classes.content} key={keygen()} >
                    <Typography className={classes.heading} key={keygen()}>{label}</Typography>
                    <Typography className={classes.secondaryHeading} key={keygen()} >{`Price :${amount}.${'00'}`}</Typography>
                </CardContent>
            </ButtonBase>
        </StyledButton>
    );
}