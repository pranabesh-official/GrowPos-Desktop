import React, { Component } from 'react';
import { Input, Button, Select } from '../../../LayoutManeger/FormManager'
import { DataConsumer , DataContext} from '../../../../LocalDB'
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import {CurrentTab} from '../../../../store/action/syncAction'
class Addcategory extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      Category_Name: '',
      Source_id: '',
      Type: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
  }
  componentDidMount(){
    this.props.CurrentTab('Addcategory')
  }
  handleReset() {
    this.setState({
      Category_Name: '',
      Source_id: '',
      Type: '',
    });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handlesubmit() {
    const { Category_Name, Source_id, Type } = this.state
    const {Source} = this.context
    let [filter] = Source.filter(item => item._id === Source_id)
    const data = { Name:Category_Name, Source_id, Type , Source: filter.Name}
    if (Category_Name && Source_id && Type) {
      this.context.addItem('Category',data)
    }
    this.handleReset()
  }
  render() {
    const { Category_Name, Source_id, Type } = this.state
    return (

          <DataConsumer>
            {({ Source, options }) => (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Input
                    name="Category_Name"
                    label="Category Name"
                    type='text'
                    value={Category_Name}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={7} md={7}>
                  <Select
                    label="Select Source"
                    name="Source_id"
                    value={Source_id}
                    options={Source}
                    optionsValue={'_id'}
                    optionsDisplay={'Name'}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={5} md={5}>
                  <Select
                    label="Type"
                    name="Type"
                    value={Type}
                    options={options}
                    optionsValue={'name'}
                    optionsDisplay={'name'}
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

    );
  }
}


const mapStateToProps = (state) => {
  return {
      data: state.DataStore,
      sync: state.SyncData,
      Auth: state.Auth,
  }
}

Addcategory.contextType = DataContext

export default connect(mapStateToProps,{CurrentTab})(Addcategory)









