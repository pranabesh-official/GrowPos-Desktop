import React, { useState , useEffect} from 'react';
import Controls from '../../../../components/controls/Controls'
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import { BillingDetails } from '../../../../store/action/Cart'

const DiscountType = [
    { _id: 'Amount', name: 'Amount' },
    { _id: 'Percent', name: 'Percent' }
]

const Discount = (props) => {
    const {Active} = props.Cart
    const initialFValues = {
        Discount: '',
        Percent: 'Amount',
    }
    const [values, setValues] = useState(initialFValues);
    const {setOpenPopup } = props
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        props.BillingDetails(name, value)
    }
    const handletype = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if(value === 'Percent'){
            props.BillingDetails(name, true)
        }
        if(value === 'Amount'){
            props.BillingDetails(name, false)
        }
    }
    useEffect(()=>{
        if(Active.Discount){
            if(Active.Percent){
                setValues({
                    Discount: Active.Discount,
                    Percent: 'Percent',
                })
            }else{
                setValues({
                    Discount: Active.Discount,
                    Percent: 'Amount',
                })
            }
           
        }
    },[Active.Discount,Active.Percent])
    const resetForm = () => {
        setValues(initialFValues);
        props.BillingDetails('Percent', false)
        props.BillingDetails('Discount', '')
    }
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={12} >
                <Controls.RadioGroup
                    name="Percent"
                    value={values.Percent}
                    onChange={handletype}
                    options={DiscountType}
                    size="small"
                    optionsValue={'_id'}
                    optionsDisplay={'name'}
                />
            </Grid>
            <Grid item xs={12} sm={12} >
                <Controls.Input
                    name='Discount'
                    label='Discount'
                    type='number'
                    value={values.Discount}
                    size="small"
                    fullWidth
                    onChange={handleInputChange}
                />
            </Grid>
            <div>
                <Controls.Button
                  type="submit"
                  text="Done"
                  color="primary"
                  onClick={()=>setOpenPopup()}
                />
                <Controls.Button
                  text="Reset"
                  color="default"
                  onClick={resetForm}

                />
                {/* <Controls.Button
                  text="Remove"
                  color="secondary"
                  onClick={}

                /> */}
              </div>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.DataStore,
        Cart: state.Cart,
    }
}
export default connect(mapStateToProps, { BillingDetails })(Discount);