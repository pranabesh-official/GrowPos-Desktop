import React, { useEffect, useContext } from 'react'
import { Grid } from '@material-ui/core'; //Chip
import Controls from "../../../../components/controls/Controls";
import { useForm } from '../../../../components/useForm';
import { DataContext } from '../../../../LocalDB'


const AddProduct = (props) => {
  const { addOrEdit, recordForEdit } = props
  const { Category, Tax } = useContext(DataContext)
  const initialFValues = {
    Name: '',
    Category_id: '',
    Tax_Percent: 0,
    Price: 0,
    Cost: 0,
    haveCost: false,
    Qnt: 0,
    withTax: false,
    AddTax: false,
    Inventory: false,
    Purchase_Date: new Date(),
    Expire_Date: new Date(),
    _id: null,
    error: ''
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('Name' in fieldValues)
      temp.Name = fieldValues.Name ? "" : "This field is required."
    if ('Category_id' in fieldValues)
      temp.Category_id = fieldValues.Category_id ? "" : "This field is required."
      if ('Price' in fieldValues)
      temp.Price = fieldValues.Price !== 0 && fieldValues.Price > 0 ? "" : "Enter A Valid Amount!"
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
        let tax = {Name:'zeroTax',Percent: 0 }
        const selectCategory = Category.find(item => item._id === values.Category_id)
        if(Tax){
          const find = Tax.find(item => item.Category_id === values.Category_id)
          if(find){
            tax=find
          }
        }
        console.log(tax)
        const newvalues = Object.assign(values, {
          Category: selectCategory.Name,
          Tax_Name: tax.Name ,
          Tax_Percent: tax.Percent ,
          Source_Name: selectCategory.Source,
          Type: selectCategory.Type
        })
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
    <Grid container spacing={1}>
      <Grid item xs={6} >
        <Grid container spacing={1}>
          <Grid item xs={12} >
            <Controls.Input
              name="Name"
              label="Product Name"
              type="text"
              size="small"
              fullWidth
              value={values.Name}
              onChange={handleInputChange}
              error={errors.Name}
            />
          </Grid>
          <Grid item xs={5} >
            <Controls.Input
              label="Price"
              name="Price"
              type="number"
              size="small"
              fullWidth
              value={values.Price}
              onChange={handleInputChange}
              error={errors.Price}
            />
          </Grid>
          <Grid item xs={7} >
            <Controls.Input
              label="Cost (optional)"
              name="Cost"
              type="number"
              size="small"
              fullWidth
              value={values.Cost}
              onChange={handleInputChange}
              error={errors.Cost}
            />
          </Grid>
          <Grid item xs={5} >
            <Controls.Input
              label="Qnt (optional)"
              name="Qnt"
              type="number"
              size="small"
              fullWidth
              value={values.Qnt}
              onChange={handleInputChange}
              error={errors.Qnt}
            />
          </Grid>
          <Grid item xs={12} style={{ borderTop: '1px solid #f0f0f0' }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controls.Checkbox
                  name="AddTax"
                  label="Enter Tax Manually"
                  value={values.AddTax}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6} style={{ borderLeft: '1px solid #f0f0f0' }}>
                <Controls.Input
                  label="Tax Percent"
                  name="Tax_Percent"
                  type="number"
                  size="small"
                  fullWidth
                  disabled={values.AddTax ? false : true}
                  value={values.Tax_Percent}
                  onChange={handleInputChange}
                  error={errors.Tax_Percent}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} style={{ borderLeft: '1px solid #f0f0f0' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} >
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
          <Grid item xs={6} >
            <Controls.DatePicker
              name="Purchase_Date"
              label="Purchase Date"
              value={values.Purchase_Date}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} >
            <Controls.DatePicker
              name="Expire_Date"
              label="Expire Date"
              value={values.Expire_Date}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} >
            <Controls.Checkbox
              name="Inventory"
              label="Add to Inventoty "
              disabled={values.Qnt !== 0 && values.Qnt > 0 ? false : true}
              value={values.Inventory}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} >
            <Controls.Checkbox
              name="withTax"
              label="Include Tax "
              value={values.withTax}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <div>
          <Controls.Button
            type="submit"
            text="Submit"
            onClick={ handleSubmit} />
          <Controls.Button
            text="Reset"
            color="default"
            onClick={resetForm} />
        </div>
      </Grid>
    </Grid>
  )
  
}



export default AddProduct



