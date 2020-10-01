import React, { useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { useForm } from '../../../../components/useForm'
import Controls from '../../../../components/controls/Controls'
import { Grid, Paper } from '@material-ui/core';
import { DataContext } from '../../../../LocalDB'
import Notification from '../../../../components/Notification'

const AntTabs = withStyles((theme) => ({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: theme.palette.primary.main,
    },
}))(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: theme.palette.primary.main,
            opacity: 1,
        },
        '&$selected': {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: theme.palette.primary.main,
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);


const useStyles = makeStyles((theme) => ({
    root: props => {
        return {
            flexGrow: 1,
            height: `${(props.height) - 200}px`,
        }
    },
    padding: {
        padding: theme.spacing(3),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },
    Body: props => {
        return {
            ...theme.GlobalBox,
            overflow: 'auto',
            height: `${(props.height) - 200}px`,
            padding: 8
        }
    },
    Footer: props => {
        return {
            ...theme.GlobalBox,
            padding: 5,
            width: '100%',
            height: `${48}px`,
            borderTop: `1px solid ${theme.palette.divider}`,
        }
    },

}));



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={{ background: 'white', padding: 5 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}



function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const Setup = (props) => {
    const classes = useStyles(props);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const { editItem } = useContext(DataContext)
    const { _id, ShopData } = props.Shop

    const initialFValues = {
        DeletePin: true,
        EditTax: false,
        EditCategory: true,
        EditProducts: true,
        EditSource: false,
        roundOff: false,
        printBill: true,
        printOt: true,
        billFast: true,
        OtNo: true,
        discountOffer: true,
    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Name' in fieldValues)
            temp.Name = fieldValues.Name ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const newPreferences = Object.assign(ShopData, { Preferences: values })
            editItem(_id, newPreferences).then(() => {
                setNotify({
                    isOpen: true,
                    message: 'Submitted Successfully',
                    type: 'success'
                })
            })
        }
    }
    useEffect(() => {
        if (_id) {
            if (ShopData.Preferences !== null) {
                setValues({
                    ...ShopData.Preferences
                })
            }
        }
    }, [ShopData.Preferences, _id, setValues])
    return (
        <Grid>
            <div className={classes.root}>
                <div className={classes.demo1}>
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                        <AntTab label="Preferences  " {...a11yProps(0)} />
                    </AntTabs>
                </div>
                <TabPanel value={value} index={0}>
                    <Paper className={classes.Body} >
                        <Grid item xs={12} sm={12} style={{ marginTop: 8 }}>
                            <Controls.Checkbox
                                name="DeletePin"
                                label="Allow Delete Adta all User without Pin "
                                value={values.DeletePin}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controls.Checkbox
                                name="EditCategory"
                                label="Allow Category Edit for All User"
                                value={values.EditCategory}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controls.Checkbox
                                name="EditTax"
                                label="Allow tax Edit for All User"
                                value={values.EditTax}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controls.Checkbox
                                name="EditProducts"
                                label="Allow Products Edit for All User"
                                value={values.EditProducts}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controls.Checkbox
                                name="EditSource"
                                label="Allow Source Edit for All User"
                                value={values.EditSource}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controls.Checkbox
                                name="roundOff"
                                label=" Do not roundoff sale total "
                                value={values.roundOff}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controls.Checkbox
                                name="printBill"
                                label="Print Bill receipt"
                                value={values.printBill}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controls.Checkbox
                                name="printOt"
                                label="Print order ticket / KOT receipt"
                                value={values.printOt}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controls.Checkbox
                                name="billFast"
                                label="Print receipt first, then accept payment"
                                value={values.billFast}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controls.Checkbox
                                name="OtNo"
                                label="Print order ticket / KOT number in the receipt "
                                value={values.OtNo}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controls.Checkbox
                                name="discountOffer"
                                label=" Allow All User to offer discounts"
                                value={values.discountOffer}
                                onChange={handleInputChange}
                            />
                        </Grid>

                    </Paper>
                </TabPanel>
            </div >
            <Paper className={classes.Footer}>
                <div>
                    <Controls.Button
                        type="submit"
                        text="Submit"
                        color="primary"
                        onClick={handleSubmit}
                    />
                    <Controls.Button
                        text="Reset"
                        color="default"
                        onClick={resetForm}
                    />
                </div>
            </Paper>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </Grid>
    )
}


const mapStateToProps = (state) => {
    return {
        Shop: state.Shop,
    }
}

export default connect(mapStateToProps)(Setup);





