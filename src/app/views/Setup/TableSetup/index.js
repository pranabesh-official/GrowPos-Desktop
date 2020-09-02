import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import DataProvider from '../../DataManeger'
import { View } from 'react-desktop/macOs';
import AddTable from './addTable'
import ViweTable from './viewTable'
import { Tab } from 'semantic-ui-react'


class TableSetup extends Component {
  constructor(props) {
    super(props)
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      width: 0,
      height: 0,
    };
  }

  render() {
    const panes = [
      {
        menuItem: 'Add Table',
        render: () => (
          <Tab.Pane attached={false}>
            <Grid container direction='column' >
              <DataProvider>
                <AddTable />
              </DataProvider>
            </Grid>
          </Tab.Pane>
        )
      },
    ]
    const style = {
      background: "white",
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      height: '100%',
      variant: "scrollable",
    }
    const { height } = this.state
    return (
      <Grid container spacing={1} style={{ padding: '5px' }}>
        <Grid item xs={12} sm={5} id='FormCategory' style={{ height: `${height - 10}px` }}>
          <Tab
            menu={{ borderless: true, attached: false, tabular: false, }}
            panes={panes}
          />
        </Grid>
        <Grid item xs={12} sm={7} id='ViewCategory' style={{ height: `${height - 10}px` }}>
          <View padding="0px" margin="0px" width='100%' height={`${height - 10}px`}>
            <Grid container direction="column" style={style}  >
              <DataProvider>
                <ViweTable />
              </DataProvider>
            </Grid>
          </View>
        </Grid>
      </Grid>

    );
  }
  updateDimensions = () => {
    this.setState({ width: document.getElementById('Content').clientWidth, height: document.getElementById('Content').clientHeight });
  };
  componentDidMount() {
    if (this.state.width !== document.getElementById('Content').clientWidth) {
      this.updateDimensions()
    }
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }


}

export default TableSetup
