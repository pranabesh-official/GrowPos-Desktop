import React, { useContext, useEffect } from 'react'
import { Grid } from '@material-ui/core'; //Chip
import Controls from "../../../../components/controls/Controls";
import { useForm } from '../../../../components/useForm';
import { DataConsumer } from '../../../../LocalDB' //DataContext
import { ShopHandeler } from '../../../../LocalDB/ShopDB'




const AddTax = (props) => {
  const { addOrEdit, recordForEdit } = props
  const { ShopData } = useContext(ShopHandeler)
  const initialFValues = {
    Name: ShopData.TaxName.toUpperCase() || "",
    Percent: '',
    Category_Name: '',
    _id: null
    // Tax_Group_Name: '',
    // Category:''
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('SelectCategory' in fieldValues)
      temp.Category_Name = fieldValues.Category_Name ? "" : "This field is required."
    if ('TaxPercent' in fieldValues)
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
  console.log(values)
  return (
    <DataConsumer>
      {({ Category }) => (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Controls.Select
              label="Select Category"
              name="Category_Name"
              size="small"
              fullWidth
              options={Category}
              optionsValue={'Name'}
              optionsDisplay={'Name'}
              value={values.Category_Name}
              onChange={handleInputChange}
              error={errors.Category_Name}
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
              onClick={() => resetForm()}

            />
          </div>
        </Grid>
      )}
    </DataConsumer>
  )
}



export default AddTax 