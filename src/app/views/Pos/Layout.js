import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tab } from 'semantic-ui-react'
import CardContent from '@material-ui/core/CardContent';
import classNames from 'classnames'
import { Grid } from '@material-ui/core';
import OrderSource from './OrderSource'



const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    padding: '5px',
    background: '#f0f0f0'
  },

});

function Layout(props) {
  const classes = useStyles();

  const panes = [
    {
      menuItem: 'Order',
      render: () => (
        <Tab.Pane attached={false} style={{ width: '100%', height: '100%'}}>
          <Grid container>
            <OrderSource />
          </Grid>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Current',
      render: () => (
        <Tab.Pane attached={false} style={{ width: '100%', height: '100%' }}>
          <Grid container>
          
          </Grid>
        </Tab.Pane>
      )
    },
    // {
    //   menuItem: 'Test',
    //   render: () => <Tab.Pane attached={false} disabled >Tab 3 Content</Tab.Pane>,
    // },
  ]


  return (


    <CardContent className={classNames(classes.root)} >
      <Tab
        menu={{ borderless: true, attached: false, tabular: false,  }}
        panes={panes}
      />
    </CardContent>


  );
}

export default Layout