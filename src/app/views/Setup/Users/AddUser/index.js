import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Controls from "../../../../components/controls/Controls";
import { EmployeContex, EmployeConsumer } from '../../../../LocalDB/EmoloyeDB'
import { isElectron } from 'react-device-detect'
import Titlebar from '../../../../TitleBar'
class AddUser extends Component {

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
    const { UserName, EmpolyeName, password, Gender, Mobile, City, Salary, Department, Haier_Date, Type } = this.state
    if (UserName && EmpolyeName && password && Gender && Mobile && City && Salary && Department && Haier_Date && Type) {
      const data = this.state
      this.context.handlesubmit('user', data)
    }

  };
  render() {
    return (
      <>
        {isElectron && <Titlebar />}
        <EmployeConsumer>
          {({ GenderOptions, TypeOptions, DepartmentOptions }) => (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12}>
                        <Controls.Input
                          name="EmpolyeName"
                          label="Employe Name"
                          type="text"
                          size="small"
                          fullWidth
                          value={this.state.EmpolyeName}
                          onChange={this.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controls.Input
                          name="Mobile"
                          label="Mobile"
                          type="text"
                          size="small"
                          fullWidth
                          value={this.state.Mobile}
                          onChange={this.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controls.Input
                          name="City"
                          label="City"
                          type="text"
                          size="small"
                          fullWidth
                          value={this.state.City}
                          onChange={this.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Controls.RadioGroup
                          name="Gender"
                          value={this.state.Gender}
                          onChange={this.handleChange}
                          options={GenderOptions}
                          size="small"
                          optionsValue={'name'}
                          optionsDisplay={'name'}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ borderTop: '1px solid #f0f0f0' }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <Controls.Input
                          name="UserName"
                          label="UserName"
                          type="text"
                          size="small"
                          fullWidth
                          value={this.state.UserName}
                          onChange={this.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controls.Input
                          name="password"
                          label="Password"
                          type="password"
                          size="small"
                          fullWidth
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
                    <Controls.Select
                      label="Select Department"
                      name="Department"
                      value={this.state.Department}
                      onChange={this.handleChange}
                      options={DepartmentOptions}
                      optionsValue={'name'}
                      optionsDisplay={'name'}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controls.Select
                      label="Select Type"
                      name="Type"
                      value={this.state.Type}
                      onChange={this.handleChange}
                      options={TypeOptions}
                      optionsValue={'name'}
                      optionsDisplay={'name'}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controls.DatePicker
                      label="Hair Date"
                      name="Haier_Date"
                      value={this.state.Haier_Date}
                      onChange={this.handleChange}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Controls.Input
                      name="Salary"
                      label="Salary"
                      type="number"
                      size="small"
                      fullWidth
                      value={this.state.Salary}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <div>
                <Controls.Button
                  type="submit"
                  text="Submit"
                  color="primary"
                  onClick={this.handlesubmit}
                />
                <Controls.Button
                  text="Reset"
                  color="default"
                  onClick={this.handleReset}
                />
              </div>
            </Grid>
          )
          }
        </EmployeConsumer>
      </>
    )
  }
}

AddUser.contextType = EmployeContex

export default AddUser 