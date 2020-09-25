import React, { useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Controls from "../../../../components/controls/Controls";
import { useForm } from '../../../../components/useForm';

const AddUser = (props) => {
  const { addOrEdit, recordForEdit } = props
  const [edit, setEdit] = useState(false)

  const initialFValues = {
    username: '',
    EmpolyeName: '',
    password: '',
    Gender: '',
    Mobile: '',
    City: '',
    Salary: '',
    Department: '',
    Haier_Date: new Date(),
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('username' in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required."
    if ('EmpolyeName' in fieldValues)
      temp.EmpolyeName = fieldValues.EmpolyeName ? "" : "This field is required."
    if ('password' in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required."
    if ('Gender' in fieldValues)
      temp.Gender = fieldValues.Gender ? "" : "This field is required."
    if ('Mobile' in fieldValues)
      temp.Mobile = fieldValues.Mobile ? "" : "This field is required."
    if ('City' in fieldValues)
      temp.City = fieldValues.City ? "" : "This field is required."
    if ('Category_id' in fieldValues)
      temp.Category_id = fieldValues.Category_id ? "" : "This field is required."
    if ('Percent' in fieldValues)
      temp.Percent = fieldValues.Percent ? "" : "This field is required."
    if ('Salary' in fieldValues)
      temp.Salary = fieldValues.Salary ? "" : "This field is required."
    if ('Department' in fieldValues)
      temp.Department = fieldValues.Department ? "" : "This field is required."
    if ('Haier_Date' in fieldValues)
      temp.Haier_Date = fieldValues.Haier_Date ? "" : "This field is required."

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
      if (values._id === null) {
        addOrEdit(values, resetForm)
      } else {
        addOrEdit(values, resetForm)
      }
    }
  }

  useEffect(() => {
    if (recordForEdit !== null) {
      setEdit(true)
      setValues({
        ...recordForEdit
      })
    }else{
      setEdit(false)
    }
  }, [recordForEdit, setValues])

  const DepartmentOptions = [
    { name: 'ADMIN', _id: 1 },
    { name: 'CASHIER', _id: 2 }
  ]
  const GenderOptions = [
    { name: 'Male', _id: 1 },
    { name: 'Female', _id: 2 },

  ]
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={7}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                <Controls.Input
                  name="EmpolyeName"
                  label="Employe Name"
                  type="text"
                  size="small"
                  fullWidth
                  value={values.EmpolyeName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controls.Input
                  name="Mobile"
                  label="Mobile"
                  type="text"
                  size="small"
                  fullWidth
                  value={values.Mobile}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controls.Input
                  name="City"
                  label="City"
                  type="text"
                  size="small"
                  fullWidth
                  value={values.City}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Controls.RadioGroup
                  name="Gender"
                  value={values.Gender}
                  onChange={handleInputChange}
                  options={GenderOptions}
                  size="small"
                  optionsValue={'name'}
                  optionsDisplay={'name'}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} style={{ borderTop: '1px solid #f0f0f0' }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <Controls.Input
                  name="username"
                  label="User name"
                  type="text"
                  size="small"
                  fullWidth
                  disabled={edit}
                  value={values.username}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controls.Input
                  name="password"
                  label="Password"
                  type="password"
                  size="small"
                  disabled={edit}
                  fullWidth
                  value={values.password}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={5} style={{ borderLeft: '1px solid #f0f0f0' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Controls.Select
              label="Select Department"
              name="Department"
              value={values.Department}
              onChange={handleInputChange}
              options={DepartmentOptions}
              optionsValue={'name'}
              optionsDisplay={'name'}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controls.DatePicker
              label="Hair Date"
              name="Haier_Date"
              value={values.Haier_Date}
              onChange={handleInputChange}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Controls.Input
              name="Salary"
              label="Salary"
              type="number"
              size="small"
              fullWidth
              value={values.Salary}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
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

  )

}




export default AddUser


