import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableBilling from './BillingDetails'
import Items from './Items'
import Controls from '../../../components/controls/Controls'
import { Search } from "@material-ui/icons";
import {  InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: (props) => {
        return {
            ...theme.GlobalBox,
            height: `${props.height - 68}px`,
            width: '100%',
            padding: '0 0px',
            background: '#00000000',
            paddingRight: 5,
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    Accordion: {
        height: 40,
        boxShadow: '0 0px 0px 0px ',
    },
    Card: {
        ...theme.GlobalBox,
        width: '100%',
        padding: '0 0px',
        marginBottom: 10
    },
    keyBordOrder: {
        height: 62,
        boxShadow: '0 0px 0px 0px ',
    },
    searchInput: {
        position: 'absolute',
        left: '10px',
        margin: '4px',
    },
    resize: {
        height: 27,
        fontSize: 11,
        padding: '0 0px 0px 0px '
    },
    addCart: (props) => {
        return {
            ...theme.GlobalBox,
            padding: '0 0px',
            height: `${props.height - 300}px`,
            borderTop: '1px solid #f0f0f0',
        }
    },
    body: {
        ...theme.GlobalBox,
        borderTop: '1px solid #f0f0f0',
        height: '120px',
        width: '100%',
        padding: '0 0px',
    },
    Products: (props) => {
        return {
            ...theme.GlobalBox,
            height: `${props.height - 238}px`,
            width: '100%',
            padding: '0 0px',
            background: 'white',
        }
    },

    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '40%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const OrderPane = (props) => {
    const [values, setValues] = React.useState('');

    const classes = useStyles(props);
    const [expanded, setExpanded] = React.useState(true);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleInputChange = e => {
        const {  value } = e.target
        setValues(value)
    }
    return (
        <Card className={classes.root}>
            <Card className={classes.Card}>
                <CardActions disableSpacing className={classes.Accordion}>
                    <Typography className={classes.heading} >
                        Billing Details
                    </Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        size="small"
                    >
                        <ExpandMoreIcon fontSize="inherit" />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.body} >
                        <TableBilling />
                    </CardContent>
                </Collapse>
            </Card>
            <Card className={classes.Products}>
                <CardActions className={classes.keyBordOrder}>
                    <Controls.Input
                        label={'Search By Name'}
                        type="text"
                        className={classes.searchInput}
                        size="small"
                        InputProps={{
                            classes: { input: classes.resize },
                            startAdornment: (<InputAdornment position="start" size="small" style={{ padding: 2 }}>
                                <Search fontSize="inherit" />
                            </InputAdornment>)
                        }}
                        onChange={handleInputChange}
                    />
                </CardActions>
                <CardContent className={classes.addCart} >
                    <Items height={props.height - 300} SearchName={values} />
                </CardContent>
            </Card>
        </Card>
    );
}



export default OrderPane;
