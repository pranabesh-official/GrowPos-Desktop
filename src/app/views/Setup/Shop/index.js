import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import DataProvider from '../../../LocalDB'
import { View } from 'react-desktop/macOs';
import Shop from './ShopSetup'
import ShopProfile from './ShopProfile'
import ShopProvider from '../../../LocalDB/ShopDB'

class ShopSetup extends Component {
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
    const style = {
      background: "#f0f0f0' ",
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      height: '100%',
      variant: "scrollable",
    }
    return (
      <Grid container spacing={1} style={{ padding: '5px' }}>
        <Grid item xs={12} sm={5} id='FormCategory' style={{ height: `${height - 10}px` }}>
          <DataProvider>
            <ShopProvider>
              <ShopProfile />
            </ShopProvider>
          </DataProvider>
        </Grid>
        <Grid item xs={12} sm={7} id='ViewCategory' style={{ height: `${height - 10}px` }}>
          <View padding="0px" margin="0px" width='100%' height={`${height - 10}px`}>
            <Grid container direction="column" style={style}  >
              <DataProvider>
                <ShopProvider>
                  <Shop />
                </ShopProvider>
              </DataProvider>
            </Grid>
          </View>
        </Grid>
      </Grid>
    );
  }
  updateDimensions = () => {
    return new Promise((resolve, reject) => {
      this.setState({
        width: document.getElementById('Content').clientWidth,
        height: document.getElementById('Content').clientHeight
      })

    })
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

export default ShopSetup