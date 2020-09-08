import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { DataConsumer } from '../../../LocalDB'
import { ShopData } from '../../../LocalDB/ShopDB'
import icon from './location.png'

const style = theme => ({
    root: {
        maxWidth: '100%',
        borderTop: '1px solid #f0f0f0',
    },
    avatar: {
        backgroundColor: '#00000000',
        hiight: 48,
        width: 48
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
                {({ ShopData, _id }) => (
                    <Card className={classes.Profile}>
                        <DataConsumer>
                            {({deleteItem}) => (
                                <CardHeader
                                    avatar={
                                        <img
                                            src={icon}
                                            className={classes.avatar}
                                            alt="icon"
                                        />
                                    }
                                    action={
                                        <IconButton aria-label="delete" color="secondary" onClick={() =>{
                                            deleteItem(_id)
                                            sessionStorage.removeItem("ShopId")
                                        }} >
                                            <DeleteForeverIcon fontSize="inherit" />
                                        </IconButton>
                                    }
                                    title={ShopData.Name && ShopData.Name}
                                    subheader={ShopData.Type && ShopData.Bar ? `${ShopData.Type} Cum Bar` : ShopData.Type}
                                />
                            )}
                        </DataConsumer>
                        <CardContent className={classes.root}>
                            <Typography className={classes.heading}>Shop Contact</Typography>
                            <Typography className={classes.secondaryHeading}>{ShopData.Contact ? ShopData.Contact : ''}</Typography>
                            <Typography className={classes.heading}>About</Typography>
                            <Typography className={classes.secondaryHeading}>{ShopData.About ? ShopData.About : ''}</Typography>
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