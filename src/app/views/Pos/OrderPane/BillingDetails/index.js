import React, { Component } from 'react';
import { Input, Checkbox } from '../../../LayoutManeger/FormManager' // RadioGroup
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import {BillingDetails} from '../../../../store/action/Cart'

class TableBilling extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Current: null,
            Mobile:'',
            Name: '',
            serch:'',
            Discount:'',
            free:false , 
            discount:false,
            Percent:false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.props.BillingDetails(name, value )
    }
    render() {
        const { Mobile, Name, Discount, free, discount, Percent } = this.state
        return (

            <Grid container spacing={1} style={{ padding: 5 }}>
                <Grid item xs={6} sm={6} >
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} >
                            <Input
                                name='Mobile'
                                label='Customer Mobile'
                                type='number'
                                value={Mobile}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Input
                                name='Name'
                                label='Customer Name'
                                type='text'
                                value={Name}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} sm={6} style={{ borderLeft: '1px solid #f0f0f0' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} >
                            <Checkbox
                                name="free"
                                value={free}
                                onChange={this.handleChange}
                            />Free All
                            </Grid>
                        <Grid item xs={6} sm={6} >
                            <Checkbox
                                name="discount"
                                value={discount}
                                onChange={this.handleChange}
                            />Add Discount
                            </Grid>
                        <Grid item xs={6} sm={6} style={{ borderTop: '1px solid #f0f0f0' }}>
                            <Input
                                name='Discount'
                                label={Percent ? 'Percent' : 'Amount'}
                                type='number'
                                disabled={discount ? false : true}
                                value={Discount}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} style={{ borderTop: '1px solid #f0f0f0' }} >
                            <Checkbox
                                name="Percent"
                                value={Percent}
                                disabled={discount ? false : true}
                                onChange={this.handleChange}
                            />Percent
                            </Grid>
                    </Grid>
                </Grid>
            </Grid>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.DataStore,
        Cart: state.Cart,
    }
}
export default connect(mapStateToProps, {BillingDetails})(TableBilling);




