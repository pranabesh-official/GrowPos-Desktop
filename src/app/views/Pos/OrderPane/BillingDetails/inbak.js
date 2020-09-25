import React, { Component } from 'react';
import Controls from '../../../../components/controls/Controls'
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import { BillingDetails } from '../../../../store/action/Cart'

class TableBilling extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Current: null,
            Mobile: '',
            Name: '',
            serch: '',
            Discount: '',
            free: false,
            discount: false,
            Percent: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.props.BillingDetails(name, value)
    }
    render() {
        const { Mobile, Name, Discount, free, discount, Percent } = this.state
        return (

            <Grid container spacing={1} style={{ padding: 5 }}>
                <Grid item xs={6} sm={6} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} >
                            <Controls.Input
                                name='Mobile'
                                label='Customer Mobile'
                                type='number'
                                value={Mobile}
                                size="small"
                                fullWidth
                                onChange={this.handleChange}
                                error={Mobile && Mobile.length < 9 ? "Minimum 10 numbers required." : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} >
                            <Controls.Input
                                name='Name'
                                label='Customer Name'
                                type='text'
                                size="small"
                                fullWidth
                                value={Name}
                                onChange={this.handleChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} sm={6} style={{ borderLeft: '1px solid #f0f0f0' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} >
                            <Controls.Checkbox
                                name="free"
                                label='Complementary'
                                size="small"
                                value={free}
                                onChange={this.handleChange}
                            />
                            <Controls.Checkbox
                                name="discount"
                                label='Add Discount'
                                size="small"
                                value={discount}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} style={{ borderTop: '1px solid #f0f0f0' }}>
                            <Controls.Input
                                name='Discount'
                                size="small"
                                fullWidth
                                label={Percent ? 'Percent' : 'Amount'}
                                type='number'
                                disabled={discount ? false : true}
                                value={Discount}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} style={{ borderTop: '1px solid #f0f0f0' }} >
                            <Controls.Checkbox
                                name="Percent"
                                value={Percent}
                                label='Discount as Percent'
                                disabled={discount ? false : true}
                                onChange={this.handleChange}
                            />
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
export default connect(mapStateToProps, { BillingDetails })(TableBilling);




