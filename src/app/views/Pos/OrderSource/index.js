import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tables from './Tables'
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
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
          <Grid container >{children}</Grid>
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



export default function OrderSource() {
  const classes = useStyles();
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
        <Tab label="Delivery" {...a11yProps(2)} wrapped />
        <Tab label="Active" {...a11yProps(3)} wrapped />
        <Tab label="Inactive" {...a11yProps(4)} wrapped />
        <Tab label="Pending" {...a11yProps(5)} wrapped />

      </Tabs>
      <TabPanel value={value} index={0}>

        <Tables />

      </TabPanel>
      <TabPanel value={value} index={1}>
        Take Away
      </TabPanel>
      <TabPanel value={value} index={2}>
        Delivery
      </TabPanel>
      <TabPanel value={value} index={3}>
        Active
      </TabPanel>
      <TabPanel value={value} index={4}>
        Inactive
      </TabPanel>
      <TabPanel value={value} index={5}>
        Pending
      </TabPanel>
    </div>
  );
}
