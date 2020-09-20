import { Grid } from '@material-ui/core'
import React from 'react'
import StatusCard from '../../components/StatusCard'

const WidgetsDropdown = () => {
  // render
  return (
    <Grid container spacing={2} >
      <Grid item xs={4} sm={4} md={4} >
        <StatusCard
          label={'Demo'}
          status={'Active'}
          Sublabel={'Demo'}
        />
      </Grid>
      <Grid item xs={4} sm={4} md={4} >
        <StatusCard
          label={'Demo'}
          status={'Active'}
          Sublabel={'Demo'}
        />
      </Grid>
      <Grid item xs={4} sm={4} md={4} >
        <StatusCard
          label={'Demo'}
          status={'Active'}
          Sublabel={'Demo'}
        />
      </Grid>
    </Grid>
  )
}

export default WidgetsDropdown
