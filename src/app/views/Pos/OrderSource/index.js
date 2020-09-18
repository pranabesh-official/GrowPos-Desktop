import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DataProvider from '../../../LocalDB'
import Box from '@material-ui/core/Box';
import Tables from './Tables'
import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  root: props => {
    return {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      maxHeight: `${props.height - 90}px`,
    }
  },
  CartBody: props => {
    return {
      ...theme.GlobalBox,
      padding: '0 0px',
      background: 'white',
      overflow: 'auto',
      maxHeight: `${props.height - 90}px`,
      width: '100%'
    }
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    width: 90,
    padding: 0

  },
  Box: {
    height: '100%',
    width: '100%'
  },
  TabPanel: {
    height: '100%',
    width: '100%'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      className={classes.TabPanel}
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={classes.Box} >
          <Grid container >
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {children}
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}



export default function OrderSource(props) {
  const classes = useStyles(props);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Tables" {...a11yProps(0)} wrapped />
        <Tab label="Take Away" {...a11yProps(1)} wrapped />
        <Tab label="Active" {...a11yProps(2)} wrapped />
        <Tab label="Inactive" {...a11yProps(3)} wrapped />
        <Tab label="Pending" {...a11yProps(4)} wrapped />

      </Tabs>
      <TabPanel value={value} index={0}>
        <Paper className={classes.CartBody}>
          <Grid container >
            <Tables props={props} Type={'Table'} />
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paper className={classes.CartBody}>
          <Grid container >
            <DataProvider>
              <Tables props={props} Type={'TakeAway'} />
            </DataProvider>
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Paper className={classes.CartBody}>
          <Grid container >
            <Tables props={props} Status={'Active'} />
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Paper className={classes.CartBody}>
          <Grid container >
            <Tables props={props} Status={'Inactive'} />
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Paper className={classes.CartBody}>
          <Grid container >
            <Tables props={props} Status={'Pending'} />
          </Grid>
        </Paper>
      </TabPanel>
    </div>
  );
}
