import React, {  useEffect } from 'react'
import { Grid } from '@material-ui/core'; //Chip
import Controls from "../../../../components/controls/Controls";
import { useForm } from '../../../../components/useForm';



const AddSource = (props) => {
  const { addOrEdit, recordForEdit } = props
 
  const initialFValues = {
    Name:'',
    Address: '',
    Mobile: '',
    _id: null
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('Name' in fieldValues)
      temp.Name = fieldValues.Name ? "" : "No Tax Name Found!"
    if ('Mobile' in fieldValues)
      temp.Mobile = fieldValues.Mobile.length > 9 ? "" : "Minimum 10 numbers required."
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
      setValues({
        ...recordForEdit
      })
    }
  }, [recordForEdit, setValues])
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Controls.Input
          name="Name"
          label="Sorce Name"
          type="text"
          size="small"
          fullWidth
          value={values.Name}
          onChange={handleInputChange}
          error={errors.Name}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Controls.Input
          name="Mobile"
          label="Mobile"
          type="number"
          size="small"
          fullWidth
          value={values.Mobile}
          onChange={handleInputChange}
          error={errors.Mobile}
        />

      </Grid>
      <Grid item xs={12} sm={12}>
        <Controls.Input
          name="Address"
          label="Address"
          type="text"
          size="small"
          fullWidth
          value={values.Address}
          onChange={handleInputChange}
          error={errors.Address}
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
          onClick={() => resetForm()}

        />
      </div>
    </Grid>

  )
}



export default AddSource

