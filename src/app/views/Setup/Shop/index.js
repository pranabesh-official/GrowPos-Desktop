import React, { Component } from 'react';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import DataProvider from '../../../LocalDB'
import Shop from './ShopSetup'
// import ShopProfile from './ShopProfile'
import ShopProvider from '../../../LocalDB/ShopDB'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

const style = (theme) => ({
  Body: {
    ...theme.GlobalBox,
    background: '#f0f0f0',
    paddingRight: 5,
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
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'default'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem',
    }
  },
  root: {
    padding: theme.spacing(2),
    borderRadius: 0,
    border: 0,
    boxShadow: '0 0px 0px 0px ',
    height: '100%',
    width: '100%',
    borderTop: '1px solid #f0f0f0',
    background: '#00000000',
    backgroundColor: '#00000000',
  },
  Title: {
    textAlign: 'center'
  },
  Content: {
    textAlign: 'center'
  },
  avatar: {
    backgroundColor: '#00000000',
    hiight: 100,
    width: 100
  }

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
      <Grid container spacing={3} style={{ padding: '5px' }}>
        <Grid item xs={12} sm={5} id='FormCategory' style={{ height: `${height - 10}px` }}>
          <Paper className={classes.root}>
            <div className={classes.Title}>
              <img
                src={'http://localhost:4545/static/img/location.png'}
                className={classes.avatar}
                alt="icon"
              />
            </div>
            <div className={classes.Content}>
              <Typography variant="h6">
                Setup Your Shop Details
              </Typography>
              <Typography variant="body2" display="inline">
                This Set Up Only  for Admin
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7} id='ViewCategory' style={{ height: `${height - 10}px` }}>
          <Paper className={classes.Body} style={{ height: `${height - 10}px` }}>
            <DataProvider>
              <ShopProvider>
                <Shop height={height} />
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
