import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import {ContactSupport} from '@material-ui/icons';
// const getStatus = (status) => {
//     switch (status) {
//         case 'Active': return success
//         case 'Inactive': return secondary
//         case 'Pending': return warning
//         case 'Banned': return danger
//         default: return info
//     }
// }

// const getType = (Type) => {
//     switch (Type) {
//         case 'Table': return location
//         case 'Delivery': return 'http://localhost:4545/static/img/location.png'
//         case 'TakeAway': return 'http://localhost:4545/static/img/take-away.png'
//         default: return 'http://localhost:4545/static/img/take-away.png'
//     }
// }
const useStyles = makeStyles(theme => ({
    details: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
    },
    content: {
        flex: '1 0 auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(22),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: theme.palette.dark.main
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(14),

    },
    logo: () => {
        return {
            width: '30%',
            padding: '2px'
        }
    },
    titleIcon: {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '4rem',
        }
    },
    main: {
        height: '100%',
        width: '100%'
    }
}))


const StyledButton = withStyles({
    root: {
        display: 'flex',
        background: 'white',
        borderRadius: 0,
        padding: 8,
        textAlign: 'initial',
        justifyContent: 'space-between',
        border: 0,
        height: 100,
        maxHeight: 100,
        boxShadow: '0 0px 0px 0px ',
        "&:hover": {
            backgroundColor: 'white',
            "@media (hover: none)": {
                backgroundColor: 'white'
            }
        }
    },

})(Card);

export default function Support(props) {
    const classes = useStyles(props);
    const {  label, sublabel } = props

    return (
        <StyledButton className={classes.main} >
           
                <>
                    <div className={classes.Title}>
                        <IconButton disableRipple className={classes.titleIcon} >
                            <ContactSupport fontSize='inherit' />
                        </IconButton>
                    </div>
                    <div className={classes.details}>
                        <CardContent className={classes.content} >
                            <Typography className={classes.heading}>{label}</Typography>
                            <Typography className={classes.secondaryHeading}>{sublabel}</Typography>
                        </CardContent>
                    </div>
                </>
            
        </StyledButton>
    );
}