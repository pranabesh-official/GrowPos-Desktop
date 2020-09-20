import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeLite, ThemeDark, success, secondary, warning, danger, info, light } from '../../Themes'
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
        default: return info
    }
}

const useStyles = makeStyles(theme => ({
    details: {
        display: 'flex',
        height: 'auto',
    },
    content: {
        flex: '1 0 auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: light,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(14),
        color: success,

    },
    root: props => {
        return {
            background: theme.palette.dark.main,
            width:'100%',
            height: 100
            
        }
    }

}))


const StyledButton = withStyles({
    root: {
        display: 'flex',
        borderRadius: 0,
        padding: '0 0px',
        margin: '2px',
        justifyContent:'center',
        textAlign: 'center',
        // "&:hover": {
        //     backgroundColor:warning ,

        //     "@media (hover: none)": {
        //         backgroundColor: ThemeDark
        //     }
        // }
    },
    // cardAction: {

    // }
})(Card);

export default function StatusCard(props) {
    const classes = useStyles(props);
    const { onClick, label,  Sublabel } = props

    let key = 0
    const keygen = () => {
        key = key + 1
        return key
    }


    return (
        <StyledButton className={classes.root} key={keygen()}>
            <ButtonBase
                // className={classes.cardAction}
                onClick={onClick}

            >
                <div className={classes.details}>
                    <CardContent className={classes.content} key={keygen()}>
                        <Typography className={classes.heading}> {label}</Typography>
                        <Typography className={classes.secondaryHeading}>{Sublabel}</Typography>
                    </CardContent>
                </div>
            </ButtonBase>
        </StyledButton>
    );
}