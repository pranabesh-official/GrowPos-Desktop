import React from 'react'
import { AppBar } from '@material-ui/core'
import { connect } from 'react-redux'
import {  makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height:'41px',
    background:'white',
  },
}));

const DataTableUtils=(Props)=> {
  const classes = useStyles();

    return (
      <AppBar position="static" classes={{
        root: classes.root
      }}>

      </AppBar>
    )
}
const mapStateToProps = (state) => {
  return {
    // data: state.apiData,
    sync: state.SyncData
  }
}

export default connect(mapStateToProps)(DataTableUtils)
