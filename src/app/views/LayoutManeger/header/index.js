import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';


const useStyles = makeStyles((theme) => ({
    root: (props) => {
        return {
            maxWidth: '100%',
            borderRadius: 0,
            border: 0,
            padding: '0 0px',
            boxShadow: '0 0px 0px 0px ',
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
}));

export default function Header(props) {
    const classes = useStyles(props);
    const {title, subtitle , src} = props
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={ src &&
                    <img
                        src={src}
                        className={classes.avatar}
                        alt="icon"
                    />
                }
                title={title}
                subheader={subtitle}
                className={classes.header}
            />
        </Card>
    );
}
