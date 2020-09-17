import React from 'react'
import { Typography, makeStyles, IconButton, Paper } from '@material-ui/core'
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        borderRadius: 0,
        border: 0,
        boxShadow: '0 0px 0px 0px ',
        height: '100%',
        width: '100%',
        borderTop: '1px solid #f0f0f0'
    },
    Title: {
        textAlign: 'center'
    },
    Content: {
        textAlign: 'center'
    },
    link: {
        textAlign: 'center',
        justifyContent:'center',
        color: theme.palette.primary.main,
        fontSize:12
    },
    titleIcon: {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.main,
        '&:hover': {
            backgroundColor: theme.palette.warning.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
}))

export default function Info(props) {

    const { title, subTitle, link } = props;
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
            <div className={classes.Title}>
                <IconButton disableRipple className={classes.titleIcon}>
                    <AnnouncementIcon />
                </IconButton>
            </div>
            <div className={classes.Content}>
                <Typography variant="h6">
                    {title}
                </Typography>
                <Typography variant="body2" display="inline">
                    {subTitle}
                </Typography>
                {link &&
                    <Typography variant="body2" display="inline" ><Link to={link.to} className={classes.link} > {link.title}</Link></Typography>
                }

            </div>
        </Paper>

    )
}
