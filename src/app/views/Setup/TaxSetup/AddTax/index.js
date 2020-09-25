import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'; //Chip
import Controls from "../../../../components/controls/Controls";
import { useForm } from '../../../../components/useForm';
import { DataConsumer } from '../../../../LocalDB' //DataContext
// import { ShopHandeler } from '../../../../LocalDB/ShopDB'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TaxGroup from './TaxGroup'

const AntTabs = withStyles((theme) => ({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
  },
}))(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: 1,
    },
    '&$selected': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: theme.palette.primary.main,
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
  },


}));



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}



function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const AddTax = (props) => {
  const { addOrEdit, recordForEdit } = props
  // const { ShopData } = useContext(ShopHandeler)
  const classes = useStyles(props);
  const initialFValues = {
    Name: "",
    Percent: '',
    Category_id: '',
    _id: null
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('Category_id' in fieldValues)
      temp.Name = fieldValues.Name ? "" : "No Tax Name Found!"
    if ('Percent' in fieldValues)
      temp.Name = fieldValues.Name ? "" : "No Tax Name Found!"
    if ('Category_id' in fieldValues)
      temp.Category_id = fieldValues.Category_id ? "" : "This field is required."
    if ('Percent' in fieldValues)
      temp.Percent = fieldValues.Percent ? "" : "This field is required."
    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      addOrEdit(values, resetForm)
    }
  }
  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit
      })
    }
  }, [recordForEdit, setValues])

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label=" Taxs" {...a11yProps(0)} />
          <AntTab label="Tax Group" {...a11yProps(1)} />
        </AntTabs>
      </div>
      <TabPanel value={value} index={0} style={{ padding: 8 }}>
        <DataConsumer>
          {({ Category, TaxGroup }) => (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <Controls.Select
                  label="Tax Group Name"
                  name="Name"
                  size="small"
                  fullWidth
                  options={TaxGroup}
                  optionsValue={'Name'}
                  optionsDisplay={'Name'}
                  value={values.Name}
                  onChange={handleInputChange}
                  error={errors.Name}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controls.Select
                  label="Select Category"
                  name="Category_id"
                  size="small"
                  fullWidth
                  options={Category}
                  optionsValue={'_id'}
                  optionsDisplay={'Name'}
                  value={values.Category_id}
                  onChange={handleInputChange}
                  error={errors.Category_id}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controls.Input
                  name="Percent"
                  label="Tax Percent"
                  type="number"
                  size="small"
                  fullWidth
                  value={values.Percent}
                  onChange={handleInputChange}
                  error={errors.Percent}
                />
              </Grid>

              <div>
                <Controls.Button
                  type="submit"
                  text="Submit"
                  color="primary"
                  onClick={handleSubmit}
                />
                <Controls.Button
                  text="Reset"
                  color="default"
                  onClick={resetForm}

                />
              </div>
            </Grid>
          )}
        </DataConsumer>
      </TabPanel>
      <TabPanel value={value} index={1} style={{ padding: 8 }}>
        <TaxGroup />
      </TabPanel>
    </div>

  )
}



export default AddTax 