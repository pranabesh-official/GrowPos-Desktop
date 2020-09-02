import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import { ShopData } from '../../../LocalDB/ShopDB'

const style = theme => ({
    root: {
        maxWidth: '100%',
    },
    avatar: {
        backgroundColor: red[500],
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
                                <Avatar aria-label={Name} className={classes.avatar}>
                                    {Name}
                                </Avatar>
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