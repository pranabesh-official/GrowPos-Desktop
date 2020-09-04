import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
    width:'auto'
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
  const classes = useStyles(props);
  console.log(props.height)
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



export default function Items() {
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
        aria-label="items"
        className={classes.tabs}
      >
        <Tab label="Food" {...a11yProps(0)} wrapped />
        <Tab label="NonVeg" {...a11yProps(1)} wrapped />
        <Tab label="Veg" {...a11yProps(2)} wrapped />
      

      </Tabs>
      <TabPanel value={value} index={0}>

      </TabPanel>
      <TabPanel value={value} index={1}>
        Take Away
      </TabPanel>
      <TabPanel value={value} index={2}>
        Delivery
      </TabPanel>
    
    </div>
  );
}
