import React, { useContext, useEffect, useState } from 'react'
import { Grid, Paper } from '@material-ui/core'; //Chip
import Controls from "../../../../components/controls/Controls";
import { useForm } from '../../../../components/useForm';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { DataContext } from '../../../../LocalDB'
import Notification from "../../../../components/Notification";
const useStyles = makeStyles((theme) => ({
    Card: {
        ...theme.GlobalBox,
        padding: 2,
        background: 'white',
        width: '100%',
        borderTop: '1px solid #f0f0f0'
    },
    CardBody: {
        ...theme.GlobalBox,
        padding: '0 0px',
        background: 'white',
        // overflow: 'auto',
    },
    CardAction: {
        ...theme.GlobalBox,
        padding: '0 0px',
        background: 'white',
        borderTop: '1px solid #f0f0f0'
    },
}));


const AddShop = (props) => {
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const { addItem, editItem } = useContext(DataContext)
    const { ShopType, _id, ShopData } = props.Shop
    const initialFValues = {
        Name: '',
        Type: '',
        Contact: '',
        About: '',
        Location: '',
        TaxName: '' || 'zeroTax',
        TaxNo: '',
        Bar: false,
        Kitchen: false,
        // _id:null
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
            let ResturantType = []
            if (values.Bar) {
                ResturantType.push({ name: 'Bar', id: 1 })
            }
            if (values.Kitchen) {
                ResturantType.push({ name: 'Kitchen', id: 2 })
            }
            if (_id) {
                const newvalues = Object.assign(values, { ResturantType })
                editItem(_id, newvalues).then(()=>{
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                })
            } else {
                const newvalues = Object.assign(values, { ResturantType: ResturantType, shopAdd: true , OT:null , Bill:null })
                addItem('Shop', newvalues).then(() => {
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

    const classes = useStyles();
    return (
        <Paper className={classes.Card} >
            <Grid container spacing={1} >
                <Grid item xs={12} sm={12} >
                    <Paper className={classes.CardBody} >
                        <Grid container spacing={1} >
                            <Grid item xs={6} sm={6} >
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
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sm={6} >
                                <Grid container spacing={1} >
                                    <Grid item xs={12} sm={12} style={{ borderLeft: '1px solid #f0f0f0' }}>
                                        <Controls.Checkbox
                                            label="Kitchen"
                                            name="Kitchen"
                                            disabled={values.Type === 'Resturant' ? false : true}
                                            value={values.Kitchen}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} >
                                        <Controls.Checkbox
                                            label="Bar"
                                            name="Bar"
                                            disabled={values.Type === 'Resturant' ? false : true}
                                            value={values.Bar}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} >
                                <Grid container spacing={1} >
                                    <Grid item xs={5} sm={5} >
                                        <Controls.Input
                                            name="TaxName"
                                            label="Tax Name ( Optional ) "
                                            type='text'
                                            size="small"
                                            fullWidth
                                            error={errors.TaxName}
                                            value={values.TaxName}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={7} >
                                        <Controls.Input
                                            name="TaxNo"
                                            label={values.TaxName ? `${values.TaxName} No` : "Tax No"}
                                            type='text'
                                            size="small"
                                            fullWidth
                                            error={errors.TaxNo}
                                            disabled={values.TaxName ? false : true}
                                            value={values.TaxNo}
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
                                    <Grid item xs={12} sm={12} >
                                        <Controls.Input
                                            name="About"
                                            label="About"
                                            type='text'
                                            size="small"
                                            fullWidth
                                            error={errors.About}
                                            value={values.About}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} >
                    <Paper className={classes.CardAction}>
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
                </Grid>
            </Grid>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </Paper>
    )
}


const mapStateToProps = (state) => {
    return {
        Shop: state.Shop,
    }
}

export default connect(mapStateToProps)(AddShop);