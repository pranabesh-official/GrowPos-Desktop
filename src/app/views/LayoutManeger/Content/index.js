import React from 'react'
import { Card,  Paper } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
const useStyles = makeStyles(theme => ({
    header: ({ HeaderSize }) => {
        return {
            borderRadius: 0,
            border: 0,
            height: `${HeaderSize}px`,
            padding: '0 0px',
            boxShadow: '0 0px 0px 0px ',
            background: 'white',
            borderBottom: '1px solid #f0f0f0'
        }
    },
    headercontent: ({ HeaderSize }) => {
        return {
            height: `${HeaderSize}px`,
        }
    },
    Body: ({ ContentSize }) => {
        return {
            height: `${ContentSize}px`,
        }
    },
    Action: ({ ActionSize }) => {
        return {
            height: `${ActionSize}px`,
        }
    }

}))

const Pane = withStyles({
    root: {
        borderRadius: 0,
        border: 0,
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',
        background: 'white',
        overflow: 'auto',
        borderTop: '1px solid #f0f0f0'
    },

})(Paper);
export default function Content(props) {
    const classes = useStyles(props);
    const { title, subTitle, icon, Content, Action } = props;

    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    avatar={icon}
                    title={title}
                    subheader={subTitle}
                    className={classes.header}
                />
                <Pane className={classes.Body} >
                    {Content}
                </Pane>
                {Action &&
                    <Pane className={classes.Action} >
                        {Action}
                    </Pane>
                }

            </Card>
        </>
    )
}
