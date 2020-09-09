import React, { Component } from 'react'
import { Paper, Grid, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
// import { SyncDbDone } from '../store/action/syncAction'

import { DataConsumer } from '../LocalDB'
import { Icon } from 'semantic-ui-react'

class TheFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { change, isSync } = this.props.sync
    const { dataload } = this.props.data
    const lastSync = () => {
      const currentdate = new Date();
      const datetime = "Last Sync: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
      return datetime
    }
    const SyncData = () => {
      return (
        <DataConsumer>
          {({ syncData }) => (
            <>
              <IconButton
                color={change !== 0 ? "secondary" : "primary"}
                size="small"
              >
                <Icon loading={isSync} name='sync' size='small' />
                {change !== 0 && <h6 style={{ fontSize: '10px' }}>{change}</h6>}
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  syncData()
                    .then((d) => {
                      console.log(d)
                    })
                    .catch((err) => {
                      console.log(err)
                    });
                }}
              >
                {change !== 0 ? <h6 style={{ fontSize: '10px', color: 'black' }}>{'Sync now'}</h6> :
                  <>
                    <h6 style={{ fontSize: '10px', color: 'black' }}>{lastSync()}</h6>
                  </>
                }
              </IconButton>
            </>
          )}
        </DataConsumer>
      )
    }
    const DBStatus = () => {
      return (
        <DataConsumer>
          {({ loadAllData }) => (
            <>
              <IconButton
                color={dataload ? "primary" : "secondary"}
                size="small"
              >
                <Icon name='database' size='small' />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => loadAllData()}
              >
                {dataload ? <h6 style={{ fontSize: '10px', color: 'black' }}>Database Connected</h6> :
                  <h6 style={{ fontSize: '10px', color: 'black' }}>Database Disconnected </h6>}
              </IconButton>
            </>
          )}
        </DataConsumer>
      )
    }
    return (
      <Paper style={{
        height: '20px',
        fontSize: '10px',
        borderRadius: 0,
        position: 'static'
      }}>
        <Grid container>
          <Grid item xs={'auto'} sm={'auto'}>
            {DBStatus()}
          </Grid>
          <Grid item xs={4} sm={4}>
            {SyncData()}
          </Grid>
          <Grid item xs={4} sm={4}>

          </Grid>
        </Grid>
      </Paper>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    sync: state.SyncData,
    data: state.DataStore,
  }
}

export default React.memo(connect(mapStateToProps)(TheFooter))
