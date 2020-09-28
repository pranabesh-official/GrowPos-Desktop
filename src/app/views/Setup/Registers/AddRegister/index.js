import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'; //Chip
import Controls from "../../../../components/controls/Controls";
import { useForm } from '../../../../components/useForm';
import { DataConsumer } from '../../../../LocalDB' //DataContext




const AddRegister = (props) => {
  const { addOrEdit, recordForEdit } = props

  const initialFValues = {
    Name: "",
    Income: 0,
    Expence: 0,
    Diposite: 0,
    _id: null

  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('Name' in fieldValues)
      temp.Name = fieldValues.Name ? "" : "This field is required."
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
  return (
    <DataConsumer>
      {({ Category }) => (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Controls.Input
              name="Name"
              label="Register Name"
              type="text"
              size="small"
              fullWidth
              value={values.Name}
              onChange={handleInputChange}
              error={errors.Name}
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
  )
}



export default AddRegister
