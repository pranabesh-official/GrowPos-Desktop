import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeLite, ThemeDark, success, secondary, warning, danger, info, light } from '../../Themes'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';

const getStatus = (status) => {
    switch (status) {
        case 'Active': return success
        case 'Inactive': return secondary
        case 'Pending': return warning
        case 'Banned': return danger
        default: return info
    }
}

const getType = (Type) => {
    switch (Type) {
        case 'Table': return 'http://localhost:4545/static/img/dinner.png'
        case 'Delivery': return 'http://localhost:4545/static/img/food-delivery.png'
        case 'TakeAway': return 'http://localhost:4545/static/img/take-away.png'
        default: return 'http://localhost:4545/static/img/take-away.png'
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
            borderBottom: `5px solid ${color}`,
            maxWidth: '100%',
            minheight: 40,
        }
    }

}))


const StyledButton = withStyles({
    root: {
        display: 'flex',
        background: ThemeLite,
        borderRadius: 0,
        padding: '0 0px',
        margin: '2px',

        textAlign: 'initial',
        "&:hover": {
            backgroundColor: ThemeDark,

            "@media (hover: none)": {
                backgroundColor: ThemeDark
            }
        }
    },
    // cardAction: {

    // }
})(Card);

export default function ClientButton(props) {
    const classes = useStyles(props);
    const { onClick, label, Type, amount, add } = props

    let key = 0
    const keygen = () => {
        key = key + 1
        return key
    }


    return (
        <StyledButton className={classes.buttonStatus} key={keygen()}>
            <ButtonBase
                // className={classes.cardAction}
                onClick={onClick}

            >
                <img
                    className={classes.logo}
                    src={getType(Type)}
                    alt="Paella dish"

                />

                <div className={classes.details}>
                    <CardContent className={classes.content} key={keygen()}>
                        {add ?
                            <Typography className={classes.heading}><AddIcon fontSize='inherit' /> {label}</Typography>
                            :
                            <Typography className={classes.heading}> {label}</Typography>
                        }

                        {amount === 'addNew' ?
                            <Typography className={classes.secondaryHeading}>{Type}</Typography>
                            :
                            <>
                                {amount === 0 ? <Typography className={classes.secondaryHeading}>{"New"}</Typography>
                                    : <Typography className={classes.secondaryHeading}>{amount.toFixed(2)}</Typography>
                                }
                            </>

                        }

                    </CardContent>
                </div>
            </ButtonBase>
        </StyledButton>
    );
}