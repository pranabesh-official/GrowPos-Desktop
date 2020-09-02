import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


import { ShopData } from '../../../LocalDB/ShopDB'
import icon from './location.png'

const style = theme => ({
    root: {
        maxWidth: '100%',
        borderTop: '1px solid #f0f0f0',
    },
    avatar: {
        backgroundColor: '#00000000',
        hiight:48,
        width:48 
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    Profile: {
        maxWidth: '100%',
        borderRadius: 0,
        border: 0,
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px '
    },
})


class ShopProfile extends Component {
    render() {
        const { classes } = this.props;
        return (
            <ShopData>
                {({ Name, Type, Contact, About ,Bar}) => (
                    <Card className={classes.Profile}>
                        <CardHeader
                            avatar={
                                <img 
                                src={icon}
                                className={classes.avatar}
                                alt="icon"
                                />
                            }
                            title={Name}
                            subheader={Bar ? `${Type} Cum Bar`:  Type }
                        />
                        <CardContent className={classes.root}>
                            <Typography className={classes.heading}>Shop Contact</Typography>
                            <Typography className={classes.secondaryHeading}>{Contact}</Typography>
                            <Typography className={classes.heading}>About</Typography>
                            <Typography className={classes.secondaryHeading}>{About}</Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                        </CardActions>
                    </Card>
                )}
            </ShopData>
        );
    }
}
export default withStyles(style, { withTheme: true })(ShopProfile);