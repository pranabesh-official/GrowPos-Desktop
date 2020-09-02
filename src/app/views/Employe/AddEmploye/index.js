import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Input, Button, Select, RadioGroup, DatePicker } from '../../LayoutManeger/FormManager'
import { EmployeContex, EmployeConsumer } from '../../../LocalDB/EmoloyeDB'


class AddEmploye extends Component {

  constructor(props) {
    super(props)
    this.state = {
      UserName: '',
      EmpolyeName: '',
      password: '',
      Gender: '',
      Mobile: '',
      City: '',
      Salary: '',
      Department: '',
      Haier_Date: new Date(),
      Type: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);

  }
  handleReset() {
    this.setState({
      UserName: '',
      EmpolyeName: '',
      password: '',
      Gender: '',
      Mobile: '',
      City: '',
      Salary: '',
      Department: '',
      Haier_Date: new Date(),
      Type: '',
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
    const {UserName, EmpolyeName, password, Gender, Mobile, City,  Salary, Department, Haier_Date, Type} = this.state
    if(UserName && EmpolyeName && password && Gender && Mobile && City &&  Salary && Department && Haier_Date && Type){
      const data = this.state
      console.log(data)
      this.context.handlesubmit('user' , data)
    }

  };
  render() {
    return (
      <EmployeConsumer>
        {({ GenderOptions, TypeOptions, DepartmentOptions }) => (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                      <Input
                        name="EmpolyeName"
                        label="Employe Name"
                        type="text"
                        value={this.state.EmpolyeName}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="Mobile"
                        label="Mobile"
                        type="text"
                        value={this.state.Mobile}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="City"
                        label="City"
                        type="text"
                        value={this.state.City}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <RadioGroup
                        name="Gender"
                        value={this.state.Gender}
                        onChange={this.handleChange}
                        options={GenderOptions}
                        optionsValue={'name'}
                        optionsDisplay={'name'}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} style={{ borderTop: '1px solid #f0f0f0' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="UserName"
                        label="UserName"
                        type="text"
                        value={this.state.UserName}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name="password"
                        label="Password"
                        type="text"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5} style={{ borderLeft: '1px solid #f0f0f0' }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Select
                    label="Select Department"
                    name="Department"
                    value={this.state.Department}
                    onChange={this.handleChange}
                    options={DepartmentOptions}
                    optionsValue={'name'}
                    optionsDisplay={'name'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select
                    label="Select Type"
                    name="Type"
                    value={this.state.Type}
                    onChange={this.handleChange}
                    options={TypeOptions}
                    optionsValue={'name'}
                    optionsDisplay={'name'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Hair Date"
                    name="Haier_Date"
                    value={this.state.Haier_Date}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Input
                    name="Salary"
                    label="Salary"
                    type="number"
                    value={this.state.Salary}
                    onChange={this.handleChange}
                  />
                </Grid>
              </Grid>
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
        )
        }
      </EmployeConsumer>
    )
  }
}

AddEmploye.contextType = EmployeContex

export default AddEmploye 