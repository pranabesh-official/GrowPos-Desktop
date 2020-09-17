import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddShop from './Addshop'
import AddTable from './Prefarence/addTable'
import Controls from "../../../../components/controls/Controls";
import Info from '../../../../components/infoPage'
import BillLayout from './Prefarence/Printer/Billlayout'
import { Grid } from '@material-ui/core';
import Otlayout from './Prefarence/Printer/OTlayout'


const useStyles = makeStyles((theme) => ({
    root: {
        ...theme.GlobalBox,
        width: '100%',
    },
    Accordion: {
        ...theme.GlobalBox,
    },
    AccordionSummary: {
        borderBottom: '1px solid #f0f0f0',
    },
    Redio: {

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
}));

export default function Shop() {
    const classes = useStyles();
    const [expanded, setExpanded] = useState('panel1');
    const [values, setValues] = useState({
        layoutOption: ''
    });
    // const [printLayout, setPrintLayout] = useState([
    //     { Name: 'BILL', _id: 1 , Display:'Bill Layout'},
    //     { Name: 'REPORT', _id: 2 , Display:'Report Layout'}
    // ])
    const printLayout = [
        { Name: 'BILL', _id: 1, Display: 'Bill ' },
        { Name: 'OT', _id: 1, Display: 'Order Ticket ' },
    ]
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })

    }
    return (
        <div className={classes.root}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.Accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    className={classes.AccordionSummary}
                >
                    <Typography className={classes.heading}>General settings</Typography>

                </AccordionSummary>
                <AccordionDetails>
                    <AddShop />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className={classes.Accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                    className={classes.AccordionSummary}
                >
                    <Typography className={classes.heading}>Dine In</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddTable />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className={classes.Accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                    className={classes.AccordionSummary}
                    style={{ margin: 0 }}

                >
                    <Typography className={classes.heading}>Printer Prefarence</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: 0 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={3} style={{ borderRight: '1px solid #f0f0f0', paddingLeft: 10 }}>
                            <Controls.RadioGroup
                                name="layoutOption"
                                value={values.layoutOption}
                                onChange={handleInputChange}
                                options={printLayout}
                                size="small"
                                optionsValue={'Name'}
                                optionsDisplay={'Display'}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <React.Fragment>
                                {values.layoutOption ?
                                    <>
                                        {values.layoutOption === 'BILL' ? <BillLayout /> : null}
                                        {values.layoutOption === 'OT' ? <Otlayout /> : null}
                                    </>
                                    :
                                    <Info
                                        title="Plese Click a tab "
                                        subTitle=" 'Bill'  or 'Order Ticket"
                                    />
                                }
                            </React.Fragment>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}


