import React, { useState } from 'react';
import Controls from '../../../../components/controls/Controls'
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import { BillingDetails } from '../../../../store/action/Cart'

const Saletype = [
    { _id: 'immediateSale', name: 'Immediate Sale' },
    { _id: 'booking', name: 'Booking' }
]

const General = (props) => {
    const initialFValues = {
        Mobile: '',
        Name: '',
        SaleType:'immediateSale',
        Occupants: '',
        free: false,
        // discount: false,
    }
    const [values, setValues] = useState(initialFValues);
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        props.BillingDetails(name, value)
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={6} sm={6} >
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} >
                        <Controls.Input
                            name='Mobile'
                            label='Customer Mobile'
                            type='number'
                            value={values.Mobile}
                            size="small"
                            fullWidth
                            onChange={handleInputChange}
                        // error={Mobile && Mobile.length < 9 ? "Minimum 10 numbers required." : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Controls.Input
                            name='Name'
                            label='Customer Name'
                            type='text'
                            size="small"
                            fullWidth
                            value={values.Name}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Controls.Input
                            name='Occupants'
                            label='Nimber Of Seats Occupied (optional)'
                            type='number'
                            size="small"
                            fullWidth
                            value={values.Occupants}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} sm={6} >
                <Controls.RadioGroup
                    name="SaleType"
                    value={values.SaleType}
                    onChange={handleInputChange}
                    options={Saletype}
                    size="small"
                    optionsValue={'_id'}
                    optionsDisplay={'name'}
                />
                <Controls.Checkbox
                    name="free"
                    label='Complementary'
                    size="small"
                    value={values.free}
                    onChange={handleInputChange}
                />
                {/* <Controls.Checkbox
                    name="discount"
                    label='Discount'
                    size="small"
                    value={values.discount}
                    onChange={handleInputChange}
                /> */}

            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.DataStore,
        Cart: state.Cart,
    }
}
export default connect(mapStateToProps, { BillingDetails })(General);