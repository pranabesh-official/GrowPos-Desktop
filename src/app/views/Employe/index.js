import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import AddEmploye from './AddEmploye'
import EmployeProvider from '../../LocalDB/EmoloyeDB'
import { Tab } from 'semantic-ui-react'
import { withStyles } from '@material-ui/core/styles';
import EmoloyDetails from './EmoloyDetails'
const style = (theme) => ({
  CartBody: {
    borderRadius: 0,
    border: 0,
    padding: '0 0px',
    boxShadow: '0 0px 0px 0px ',
    background: 'white',
    overflow: 'auto',
  },
  CartTitel: {
    borderRadius: 0,
    border: 0,
    height: '40px',
    padding: '0 0px',
    boxShadow: '0 0px 0px 0px ',
    background: 'white',
    overflow: 'auto',
    borderBottom: '1px solid #f0f0f0'
  },
  CartAction: {
    borderRadius: 0,
    border: 0,
    height: '60px',
    padding: '0 0px',
    boxShadow: '0 0px 0px 0px ',
    background: 'white',
    overflow: 'auto',
    borderTop: '1px solid #f0f0f0'
  },

});

class Employe extends Component {
  constructor(props) {
    super(props)
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      width: 0,
      height: 0,
    };
  }

  render() {
    localStorage.setItem('lastPage', '/CategorySetup')
    const { height } = this.state
    const { classes } = this.props
    const panes = [
      {
        menuItem: 'Add Employe',
        render: () => (
          <Tab.Pane attached={false}>
            <Grid container direction='column'>
              <EmployeProvider>
                <AddEmploye />
              </EmployeProvider>
            </Grid>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Employe Details',
        render: () => (
          <Tab.Pane attached={false} active={true} style={{ padding: '0px' }}>
            <Grid container direction="column" >
              <Grid item xs={12} sm={12}>
                <Paper className={classes.CartBody} style={{ height: `${height - 68}px`, maxHeight: `${height - 68}px` }}>
                  <EmployeProvider>
                    <EmoloyDetails />
                  </EmployeProvider>
                </Paper>
              </Grid>
            </Grid>
          </Tab.Pane>
        )
      }
    ]
    return (
      <Grid container spacing={1} style={{ padding: '5px' }}>
        <Grid item xs={12} sm={12} >
          <Tab
            menu={{ borderless: true, attached: false, tabular: false, }}
            panes={panes}
          />
        </Grid>
      </Grid>
    );
  }
  updateDimensions = () => {
    this.setState({ width: document.getElementById('Content').clientWidth, height: document.getElementById('Content').clientHeight });
    // this.reset()
  };
  componentDidMount() {
    if (this.state.width !== document.getElementById('Content').clientWidth) {
      this.updateDimensions()
    }
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    // this.reset()
    window.removeEventListener('resize', this.updateDimensions);
  }

}

export default withStyles(style, { withTheme: true })(Employe)

