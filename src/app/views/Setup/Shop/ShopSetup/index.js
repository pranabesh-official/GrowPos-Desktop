import React, { useContext, useEffect, useState } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'; //Chip
import Controls from "../../../../components/controls/Controls";
import { useForm } from '../../../../components/useForm';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { DataContext } from '../../../../LocalDB'
import Notification from "../../../../components/Notification";
import ReactCodeInput from 'react-code-input'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import LockIcon from '@material-ui/icons/Lock';
import { Pin } from 'react-desktop/macOs';



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
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(3),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },

    Header: props => {
        return {
            ...theme.GlobalBox,
            border: 0,
            padding: 8,
            height: `${48}px`,
            width: '100%',
            // borderBottom: '1px solid #f0f0f0'
        }
    },
    Body: props => {
        return {
            ...theme.GlobalBox,
            overflow: 'auto',
            height: `${(props.height) - 110}px`,
            padding: 8
        }
    },
    Footer: props => {
        return {
            ...theme.GlobalBox,
            padding: 0,
            width: '100%',
            height: `${48}px`,
            borderTop: `1px solid ${theme.palette.divider}`,
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(10),
    },
    pin: {
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
    }

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
                <Box >
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

const Shop = (props) => {
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const { addItem, editItem } = useContext(DataContext)
    const { ShopType, _id, ShopData } = props.Shop
    const initialFValues = {
        Name: '',
        Type: '',
        Contact: '',
        About: '',
        Location: '',
        DeletePin: true,
        EditTax: false,
        EditCategory: true,
        EditProducts: true,
        EditSource: false,
        Pin: '1234',
        roundOff: false,
        printBill: true,
        printOt: true,
        billFast: true,
        OtNo: true,
        discountOffer: true
    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Name' in fieldValues)
            temp.Name = fieldValues.Name ? "" : "This field is required."
        if ('Type' in fieldValues)
            temp.Type = fieldValues.Type ? "" : "This field is required."
        if ('Contact' in fieldValues)
            temp.Contact = fieldValues.Contact ? "" : "This field is required."
        if ('Location' in fieldValues)
            temp.Location = fieldValues.Location ? "" : "This field is required."
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
            if (_id) {
                editItem(_id, values).then(() => {
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                })
            } else {
                addItem('Shop', values).then(() => {
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                })
            }
        }
    }
    useEffect(() => {
        if (ShopData) {
            setValues({
                ...ShopData
            })
        }
    }, [ShopData, setValues])

  

    const classes = useStyles(props);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <div className={classes.root}>
                <div className={classes.demo1}>
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                        <AntTab label="General settings" {...a11yProps(0)} />
                        <AntTab label="Preferences" {...a11yProps(1)} />
                    </AntTabs>
                </div>
                <TabPanel value={value} index={0}>
                    <Paper className={classes.Body} >
                        <Grid container spacing={1} style={{ padding: 8 }}>
                            <Grid item xs={12} sm={12} >
                                <Grid container spacing={1} >
                                    <Grid item xs={12} sm={12} >
                                        <Controls.Input
                                            name="Name"
                                            label="Shop Name"
                                            type='text'
                                            value={values.Name}
                                            size="small"
                                            fullWidth
                                            error={errors.Name}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} >
                                        <Controls.Select
                                            name="Type"
                                            label="Business Type"
                                            value={values.Type}
                                            options={ShopType}
                                            optionsValue={'name'}
                                            size="small"
                                            fullWidth
                                            error={errors.Type}
                                            optionsDisplay={'display'}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6} >
                                        <Controls.Input
                                            name="Contact"
                                            label="Contact"
                                            type='text'
                                            size="small"
                                            fullWidth
                                            error={errors.Contact}
                                            value={values.Contact}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6} >
                                        <Controls.Input
                                            name="Location"
                                            label="Location"
                                            type='text'
                                            size="small"
                                            fullWidth
                                            error={errors.Location}
                                            value={values.Location}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} style={{ padding: 2 }} >
                                <Grid container spacing={2} style={{ marginTop: 8 }}>
                                    <Grid item xs={12} sm={12} className={classes.pin}>
                                        <Controls.Input
                                            name="Pin"
                                            label="Shop Owner Pin "
                                            type='text'
                                            size="small"
                                            error={errors.Pin}
                                            value={values.Pin}
                                            onChange={handleInputChange}
                                        />
                                      
                                    </Grid>
                                </Grid>
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
                            </Grid>
                        </Grid>
                    </Paper>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Paper className={classes.Body} >
                        <Grid container spacing={1} style={{ padding: 8 }}  >
                            <Grid item xs={12} sm={12} style={{ marginTop: 8 }}>
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
                        </Grid>
                    </Paper>
                </TabPanel>
            </div>
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
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        Shop: state.Shop,
    }
}

export default connect(mapStateToProps)(Shop);





