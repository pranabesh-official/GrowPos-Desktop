import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'




class Payment extends Component {
  constructor(props) {

    super(props)

    this.state = {
      options: ['Cash', 'Online', 'Paytm', 'UPI', 'Card'],
      paymentType: 'None'

    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    this.props.paymentdetail({ [name]: value })

  }
  render() {
    const { paymentType } = this.state
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Payment method
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField id="select"
              label="Payment Type"
              name="paymentType"
              value={paymentType}
              select
              size='small' fullWidth
              variant="outlined"
              onChange={this.handleChange}>
              <MenuItem value="None">None</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Paytm">Paytm</MenuItem>
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="Bank">Bank</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              name="recvamount"
              label="Recive Amount"
              fullWidth
              autoComplete="Recive Amount"
              startAdornment={<InputAdornment position="start">Rs.</InputAdornment>}
              type="number"
              variant="outlined"
              size='small'
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Table striped bordered hover size="sm" >
              <tbody>
                <tr>
                  <td className="left">
                    <strong>Table No</strong>
                  </td>
                  <td className="right"> {}</td>
                </tr>
                <tr>
                  <td className="left">
                    <strong>Bill Amount</strong>
                  </td>
                  <td className="right"> {}.00 </td>
                </tr>
                <tr>
                  <td className="left">
                    <strong>Discount </strong>
                  </td>
                  <td className="right">{}.00</td>
                </tr>
                <tr>
                  <td className="left">
                    <strong>TAX Amount</strong>
                  </td>
                  <td className="right">{}.00</td>
                </tr>
                <tr>
                  <td className="left">
                    <strong>Payment Type</strong>
                  </td>
                  <td className="right">{}</td>
                </tr>
                <tr>
                  <td className="left">
                    <strong>Recive Amount</strong>
                  </td>
                  <td className="right">
                    <strong>{}.00</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {

  }
}
export default connect(mapStateToProps)(Payment); 
