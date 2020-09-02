import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Input, Button, Select, Checkbox, DatePicker } from '../../../LayoutManeger/FormManager'
import { DataConsumer, DataContext } from '../../../../LocalDB'
// import Table from 'react-bootstrap/Table'
import { ShopData } from '../../../../LocalDB/ShopDB'
class AddProduct extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Name: '',
      Categorytype: '',
      TaxGroup: '',
      Price: 0,
      Cost: 0,
      haveCost: false,
      Qnt: 0,
      haveQnt: false,
      withTax: false,
      selectTax: false,
      Inventory: false,
      barItem: false,
      pDate: false,
      eDate: false,
      Purchase_Date: new Date(),
      Expire_Date: new Date()
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleReset() {
    this.setState({
      Name: '',
      Categorytype: '',
      TaxGroup: '',
      Price: 0,
      Cost: 0,
      haveCost: false,
      Qnt: 0,
      haveQnt: false,
      withTax: false,
      selectTax: false,
      Inventory: false,
      barItem: false,
      eDate: false,
      pDate: false,
      Purchase_Date: new Date(),
      Expire_Date: new Date()
    });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handelchecked(event) {
    this.setState({ checked: event.target.checked });
  };
  handlesubmit() {
    const { Category, Tax } = this.context //Source , Tax
    let category = null
    let tax = null
    let Purchase_Date = null
    let Expire_Date = null
    console.log(this.state.Categorytype, Category, Tax)
    
    if (this.state.Categorytype) {
      const  [categoryFilter] = Category.filter(item => item._id === this.state.Categorytype)
      category = categoryFilter
      const [taxFilter] = Tax.filter(item => item.Category_Id === category._id)
      tax = taxFilter
    }
    if(this.state.selectTax && this.state.TaxGroup){
      const [taxFilter] = Tax.filter(item => item._id === this.state.TaxGroup)
      tax = taxFilter
    }
    if(this.state.pDate ){
      Purchase_Date = this.state.Purchase_Date
    }
    if(this.state.eDate ){
      Expire_Date=this.state.Expire_Date
    }
    const data = {
      Name: this.state.Name,
      Category: category.Name,
      Category_id: category._id,
      Tax_Name: tax.Name,
      Tax_Percent: tax.Percent,
      Tax_Group_Name: tax.Tax_Group_Name,
      Tax_Include: this.state.withTax,
      Price: this.state.Price,
      Cost: this.state.Cost || null,
      Qnt: this.state.Qnt || null,
      Type: category.Type,
      Source_Name:category.Source,
      Source_id:category.Source_id,
      Purchase_Date,
      Expire_Date,
      barItem: this.state.barItem,
      Inventory:this.state.Inventory
    }
    if(this.state.Name && this.state.Categorytype && this.state.Price){
      this.context.addItem('Products',data)
    }

  };
  render() {

    return (
      <DataConsumer>
        {({ Category, Tax }) => (
          <ShopData>
            {({ Bar }) => (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                      <Input
                        name="Name"
                        label="ProductName"
                        type="text"
                        value={this.state.Name}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="Price"
                        label="Product Price"
                        type="number"
                        value={this.state.Price}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Select
                        label="Select Category"
                        name="Categorytype"
                        value={this.state.Categorytype}
                        onChange={this.handleChange}
                        options={Category}
                        optionsValue={'_id'}
                        optionsDisplay={'Name'}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                          <Input
                            name="Cost"
                            label="Product Cost"
                            disabled={this.state.haveCost ? false : true}
                            type="number"
                            value={this.state.Cost}
                            onChange={this.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <Checkbox
                            name="haveCost"
                            value={this.state.haveCost}
                            onChange={this.handleChange}
                          />Paoduct Have Make/Perchase Cost
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Input
                            name="Qnt"
                            label="Qnt"
                            type="number"
                            disabled={this.state.haveQnt ? false : true}
                            value={this.state.Qnt}
                            onChange={this.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <Checkbox
                            name="haveQnt"
                            value={this.state.haveQnt}
                            onChange={this.handleChange}
                          />Product Have Qnt
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ borderLeft: '1px solid #f0f0f0' }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={5}>
                          <DatePicker
                            label='Purchase Date'
                            name='Purchase_Date'
                            disabled={this.state.pDate ? false : true}
                            value={this.state.Purchase_Date}
                            onChange={this.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                          <Checkbox
                            name="pDate"
                            value={this.state.pDate}
                            onChange={this.handleChange}
                          />Add Purchase Date
                        </Grid>
                        <Grid item xs={12} sm={5}>
                          <DatePicker
                            label='Expire Date'
                            name='Expire_Date'
                            disabled={this.state.eDate ? false : true}
                            value={this.state.Expire_Date}
                            onChange={this.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                          <Checkbox
                            name="eDate"
                            value={this.state.eDate}
                            onChange={this.handleChange}
                          />Add Expire Date
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{ borderTop: '1px solid #f0f0f0' }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={4}>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={12}>
                              <Checkbox
                                name="withTax"
                                value={this.state.withTax}
                                onChange={this.handleChange}
                              />Include Tax
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <Checkbox
                                name="Inventory"
                                disabled={this.state.Qnt !== 0 && this.state.Qnt > 0 && this.state.haveQnt ? false : true}
                                value={this.state.Inventory}
                                onChange={this.handleChange}
                              />Add To Inventory
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              {Bar ?
                                <Checkbox name="barItem" value={this.state.barItem} onChange={this.handleChange} ></Checkbox>
                                : null}{Bar ? 'Bar Item' : null}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={8} style={{ borderLeft: '1px solid #f0f0f0' }}>
                          <Grid item xs={12} sm={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={6}>
                                <Grid container spacing={1}>
                                  <Grid item xs={12} md={12} >
                                    <Checkbox
                                      name="selectTax"
                                      value={this.state.selectTax}
                                      onChange={this.handleChange}
                                    />Slecct Other TAX Group
                                  </Grid>
                                  <Grid item xs={12} md={12} >
                                    <Select
                                      label="Select Tax Group"
                                      name="TaxGroup"
                                      disabled={this.state.selectTax ? false : true}
                                      value={this.state.TaxGroup}
                                      options={Tax}
                                      optionsValue={'_id'}
                                      optionsDisplay={'Tax_Group_Name'}
                                      onChange={this.handleChange}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
                <div style={{ borderTop: '1px solid #f0f0f0' }}>
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
          </ShopData>
        )
        }
      </DataConsumer>
    )
  }
}

AddProduct.contextType = DataContext

export default AddProduct 