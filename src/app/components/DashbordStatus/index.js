import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ThemeLite, dark, success, light } from '../../Themes'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ButtonBase from '@material-ui/core/ButtonBase';


const getType = (Type) => {
    switch (Type) {
        case 'Table': return 'http://localhost:4545/static/img/dinner.png'
        case 'Delivery': return 'http://localhost:4545/static/img/food-delivery.png'
        case 'TakeAway': return 'http://localhost:4545/static/img/take-away.png'
        case 'Expence': return 'http://localhost:4545/static/img/expence.png'
        case 'Today': return 'http://localhost:4545/static/img/today.png'
        case 'Diposite': return 'http://localhost:4545/static/img/rupees.png'
        case 'Total': return 'http://localhost:4545/static/img/total.png'
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
        fontSize: theme.typography.pxToRem(20),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: light,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(14),
        color: success,

    },
    logo: () => {
        return {
            width: '20%',
            padding: '2px'
        }
    },
    // buttonStatus: props => {
    //     const color = getStatus(props.status)
    //     return {
    //         borderBottom: `5px solid ${color}`,
    //         maxWidth: '100%',
    //         minheight: 40,
    //     }
    // }

}))


const StyledButton = withStyles({
    root: {
        display: 'flex',
        background: ThemeLite,
        borderRadius: 0,
        padding: '0 0px',
        margin: '2px',
        maxHeight:100,
        textAlign: 'initial',
        "&:hover": {
            backgroundColor: dark,

            "@media (hover: none)": {
                backgroundColor: dark
            }
        }
    },

})(Card);

export default function StatusCard(props) {
    const classes = useStyles(props);
    const { onClick, label, Type, display } = props

    let key = 0
    const keygen = () => {
        key = key + 1
        return key
    }
    return (
        <StyledButton className={classes.buttonStatus} key={keygen()}>
            <ButtonBase
                onClick={onClick}
            >
                <img
                    className={classes.logo}
                    src={getType(Type)}
                    alt="Paella dish"

                />
                <div className={classes.details}>
                    <CardContent className={classes.content} key={keygen()}>
                        <Typography className={classes.heading}> {label}</Typography>
                        <Typography className={classes.secondaryHeading}>{display}</Typography>
                    </CardContent>
                </div>
            </ButtonBase>
        </StyledButton>
    );
}