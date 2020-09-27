import React, { useState } from 'react';
import Controls from '../../../../components/controls/Controls'
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import { BillingDetails } from '../../../../store/action/Cart'



const Delivery = (props) => {
    const initialFValues = {
        City: '',
        Pin: '',
        Address: '',
        Delivery: false,
    }
    const [values, setValues] = useState(initialFValues);
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        props.BillingDetails('Delivery', values)
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12} >
                <Grid container spacing={1}>
                    <Grid item xs={6} sm={6} >
                        <Controls.Input
                            name='City'
                            label='City'
                            type='text'
                            size="small"
                            fullWidth
                            value={values.City}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={6} sm={6} >
                        <Controls.Input
                            name='Pin'
                            label='Pin Code'
                            type='number'
                            value={values.Pin}
                            size="small"
                            fullWidth
                            onChange={handleInputChange}
                        // error={Mobile && Mobile.length < 9 ? "Minimum 10 numbers required." : ""}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} >
                <Controls.Input
                    name='Address'
                    label='Address'
                    type='text'
                    size="small"
                    fullWidth
                    rowsMin={3}
                    rows={5}
                    value={values.Address}
                    onChange={handleInputChange}
                />
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
export default connect(mapStateToProps, { BillingDetails })(Delivery);