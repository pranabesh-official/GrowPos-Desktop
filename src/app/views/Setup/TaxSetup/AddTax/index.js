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
    Category_id: '',
    _id: null
    // Tax_Group_Name: '',
    // Category:''
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
    // e.preventDefault()
    if (validate()) {
      if(values._id === null){
        if(e.length !== 0){
          const selctedCategory = e.find(item => item._id === values.Category_id)
          const newvalues = Object.assign(values ,{Category_Name : selctedCategory.Name })
          addOrEdit(newvalues, resetForm)
        }
      }else{
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
              onClick={()=>handleSubmit(Category)}
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