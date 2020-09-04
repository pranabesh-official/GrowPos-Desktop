import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Items from './Items'

const style = (theme) => ({
    Accordion: {
        borderRadius: 0,
        border: '1px solid #f0f0f0',
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',
    },
    Card: {
        borderRadius: 0,
        border: 0,
        height: '100%',
        width: '100%',
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',
        background: '#00000000',
        paddingRight: 5
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

});
class OrderPane extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;
        console.log(this.props)
        return (
            <Card className={classes.Card} style={{ height: `${this.props.height - 68}px` }}>
                <Accordion className={classes.Accordion} defaultExpanded >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.expanded}
                    >
                        <Typography className={classes.heading}>Coustomer Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ borderTop: '1px solid #f0f0f0' }}>

                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.Accordion} defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>Items</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ borderTop: '1px solid #f0f0f0', height: '100%' }}>
                        <Items />
                    </AccordionDetails>
                </Accordion>
            </Card>
        );
    }
}


export default withStyles(style, { withTheme: true })(OrderPane);
