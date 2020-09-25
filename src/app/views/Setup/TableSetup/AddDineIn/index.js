import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'; //Chip
import Controls from "../../../../components/controls/Controls";
import { useForm } from '../../../../components/useForm';
import { DataConsumer } from '../../../../LocalDB' //DataContext





const AddDineIn = (props) => {
  const { addOrEdit, recordForEdit } = props

  const initialFValues = {
    tableId: '',
    _id: null,
    No: '',
    table_Status: 'Inactive',
    Type: 'Table'
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('No' in fieldValues)
      temp.No = fieldValues.No ? "" : "This field is required."

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
      if (values.tableId === null) {
        const generator = require('generate-serial-number')
        const newvalues = Object.assign(values, { tableId:generator.generate(8)  })
        addOrEdit(newvalues, resetForm)
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
    <DataConsumer>
      {({ Category }) => (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Controls.Input
              name="No"
              label="Table No"
              type="number"
              size="small"
              fullWidth
              value={values.No}
              onChange={handleInputChange}
              error={errors.No}
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
      )}
    </DataConsumer>
  )
}



export default AddDineIn 