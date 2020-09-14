import React, { Component } from 'react';
import { ShopHandeler, ShopData } from '../../../../LocalDB/ShopDB' //ShopData ,
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Chip } from '@material-ui/core';
import AddTable from './Prefarence/addTable'
import PrintSetup from './Prefarence/PrintSetup'
import AddShop from './Addshop'
const style = theme => ({
    Accordion: {
        borderRadius: 0,
        border: '1px solid #f0f0f0',
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',

    },
    Card: {
        borderRadius: 0,
        border: 0,
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',
        background: '#00000000'
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
class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.abortController = new AbortController()
        this.openDilog = this.openDilog.bind(this)
    }
    componentDidMount() {
        // this.openDilog()
    }
    componentWillUnmount() {
        this.abortController.abort()
    }
    openDilog() {
        const { shopAdd, handleClickOpen } = this.context
        if (shopAdd === false) {
            handleClickOpen()
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <ShopData>
                {({ TablesQnt }) => (
                    <Card className={classes.Card}>
                        <Accordion className={classes.Accordion} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>General settings</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ borderTop: '1px solid #f0f0f0' }}>
                                <AddShop/>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className={classes.Accordion} expanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>Dine In</Typography>
                                <Chip
                                    variant="outlined"
                                    size="small"
                                    label={`TABLE QNT: ${TablesQnt}`}
                                    clickable
                                    color='primary'
                                /> 
                            </AccordionSummary>
                            <AccordionDetails style={{ borderTop: '1px solid #f0f0f0' }}>
                                <AddTable />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion className={classes.Accordion} expanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>Print Setup</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ borderTop: '1px solid #f0f0f0' }}>
                                <PrintSetup />
                            </AccordionDetails>
                        </Accordion>
                    </Card>
                )}
            </ShopData>
        );
    }
}
Shop.contextType = ShopHandeler

export default withStyles(style, { withTheme: true })(Shop);
