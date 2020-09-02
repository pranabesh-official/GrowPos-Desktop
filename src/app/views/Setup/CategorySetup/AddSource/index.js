import React, { Component } from 'react';
import { Input, Button } from '../../../LayoutManeger/FormManager'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import {CurrentTab} from '../../../../store/action/syncAction'
import {DataContext} from '../../../../LocalDB'

class AddSource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      add: '',
      tel: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleReset() {
    this.setState({
      name: '',
      add: '',
      tel: ''
    });
  }
  componentDidMount(){
    this.props.CurrentTab('AddSource')
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handlesubmit() {
    const { name, tel, add } = this.state
    const data = { Name: name, Address: add || "Null" , Mobile: tel }
    if(name && tel ){
      this.context.addItem('Source', data)
    }
    this.handleReset()
  };
  render() {
    const { name, tel, add } = this.state
    return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Input
                name="name"
                label="Source Name"
                value={name}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                name="tel"
                label="Source Phone no"
                value={tel}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Input
                name="add"
                label="Source Address"
                value={add}
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
    )
  }
}


const mapStateToProps = (state) => {
  return {
      data: state.DataStore,
      sync: state.SyncData,
      Auth: state.Auth,
  }
}
AddSource.contextType = DataContext
export default connect(mapStateToProps,{CurrentTab})(AddSource) 