import React, { Component } from 'react';
import { Input, Button, Select } from '../../../LayoutManeger/FormManager'
import {Chip, Grid } from '@material-ui/core';
import { DataConsumer, DataContext } from '../../../../LocalDB'

class AddTax extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TaxName: '',
      TaxPercent: '',
      SelectCategory: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleReset() {
    this.setState({
      TaxName: '',
      TaxPercent: '',
      SelectCategory: ''
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handlesubmit() {
    const { TaxName, TaxPercent, SelectCategory } = this.state
    let name= TaxName.toUpperCase()
    const {Category}= this.context
    const [filter] = Category.filter(item=>item._id === SelectCategory)
    if (TaxName && SelectCategory) {
      var groupName = `${filter.Name.toUpperCase()}-${TaxName.toUpperCase()}`
    }
    const data = {
      Name: name,
      Tax_Group_Name: groupName,
      Category:filter.Name,
      Category_Id:filter._id,
      Percent: TaxPercent
    }
    console.log(data)
    if (TaxName && TaxPercent && SelectCategory) {
      this.context.addItem('Tax', data)
    }
  };
  render() {
    const { TaxName, TaxPercent, SelectCategory } = this.state
    var nikename = false
    if (TaxName && SelectCategory) {
      nikename = true
    }
    const {Category}= this.context
    const [filter] = Category.filter(item=>item._id === this.state.SelectCategory)

    return (
      <DataConsumer>
        {({ Category }) => (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            {nikename &&
              <Chip
                variant="outlined"
                size="small"
                label={`Tax Group Name : ${filter.Name.toUpperCase()}-${TaxName.toUpperCase()}`}
                clickable
                style={{ marginBottom: '5px' }}
              />
            }
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                name="TaxName"
                label="Tax Name"
                type="name"
                value={TaxName}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={7} md={7}>
              <Select 
                label="Select Category"
                name="SelectCategory"
                value={SelectCategory}
                options={Category}
                optionsValue={'_id'}
                optionsDisplay={'Name'}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={5} sm={5}>
              <Input
                name="TaxPercent"
                label="Tax Percent"
                type="number"
                value={TaxPercent}
                onChange={this.handleChange}
              />
            </Grid>
            <div>
              <Button
                type="submit"
                text="Submit"
                color="primary"
                onClick={this.handlesubmit}
              />
              <Button
                text="Reset"
                color="default"
                onClick={this.handleReset}
              />
            </div>
          </Grid>
        )}
      </DataConsumer>
    )
  }
}

AddTax.contextType = DataContext

export default AddTax 