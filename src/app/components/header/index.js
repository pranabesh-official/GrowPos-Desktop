import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: (props) => {
        return {
            ...theme.GlobalBox,
            maxWidth: '100%',
            padding: '0 0px',
            height:`${props.height}px`
        }
    },
    avatar: (props) => {
        return {
            backgroundColor: '#00000000',
            hiight: `${props.height - 2}px`,
            width: `${props.height - 2}px`
        }
    },
    header: (props) => {
        return {
            height:`${props.height}px`
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(12),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(10),
    },
}));

export default function Header(props) {
    const classes = useStyles(props);
    const {title, subtitle , src} = props
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={src }
                title={<Typography variant='body1' className={classes.heading } >{title.toUpperCase()}</Typography>}
                subheader={<Typography variant='body2' className={classes.secondaryHeading } >{subtitle.toUpperCase()}</Typography>}
                className={classes.header}
            />
            
        </Card>
    );
}
