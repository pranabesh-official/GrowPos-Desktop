import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ItemButton from '../../../LayoutManeger/ItemButton'
import Box from '@material-ui/core/Box';
import { DataContext } from '../../../../LocalDB'
import {ClientHandeler} from '../../../../LocalDB/ClientDB'
import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: 'auto'
  },
  Box: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  Items: (props) => {
    return {
      height: `${props.height}`,
      width: '100%',
      overflow: 'auto',
      borderRadius: 0,
      border: 0,
      padding: '0 0px',
      boxShadow: '0 0px 0px 0px ',
    }
  },
  TabPanel: {
    height: '100%',
    width: '100%'
  }
}));

function TabPanel(props) {
  const { children, value, Category, index, ...other } = props;
  const classes = useStyles(props);
  const data = useContext(DataContext)
  const { addCart }=useContext(ClientHandeler)

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
          <Grid container  >
            <Grid item xs={12} sm={12} md={12} >
              <Paper className={classes.Items} >
                <Grid container >
                  {data.Products.map((item , index) => (
                    (
                      item.Category_id === Category._id &&
                      <Grid item xs={4} sm={4} md={3} key={index}>
                        <ItemButton
                          label={item.Name}
                          amount={item.Price}
                          onClick={()=>addCart(item)}
                          key={index}
                        />
                      </Grid>
                    )
                  ))}
                </Grid>
              </Paper>
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



export default function Items({ height }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const data = useContext(DataContext)
 
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
        {data.Category.map((item, index) => (
          <Tab
            label={item.Name}
            {...a11yProps(index)}
            wrapped
            props={item}
            key={index}
            style={{ padding: 0 }}
          />

        ))}
      </Tabs>
      {data.Category.map((item, index) => (
        <TabPanel
          value={value}
          index={index}
          Category={item}
          key={index}
          height={height}
        />
      ))}

    </div>
  );
}

