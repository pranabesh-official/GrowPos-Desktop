import React, { Component } from 'react';
import { Grid , Paper} from '@material-ui/core';
import DataProvider from '../../../LocalDB'
import Shop from './ShopSetup'
import ShopProfile from './ShopProfile'
import ShopProvider from '../../../LocalDB/ShopDB'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

const style = (theme) => ({
  Body: {
    ...theme.GlobalBox,
    background: '#f0f0f0',
    // overflow: 'auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '40%',
    flexShrink: 0,
    alignItems: 'center',
    borderBottom: '1px solid #f0f0f0'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    alignItems: 'center',
    borderBottom: '1px solid #f0f0f0'
  },

});
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
    const { classes } = this.props;
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
          <Paper className={classes.Body} style={{height:`${height - 10}px`}}>
              <DataProvider>
                <ShopProvider>
                  <Shop height={height - 10} />
                </ShopProvider>
              </DataProvider>
          </Paper>
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

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(ShopSetup))
