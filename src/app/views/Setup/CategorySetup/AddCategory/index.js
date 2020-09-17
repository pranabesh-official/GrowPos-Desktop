import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'; //Chip
import Controls from "../../../../components/controls/Controls";
import { useForm } from '../../../../components/useForm';
import { DataConsumer } from '../../../../LocalDB' //DataContext





const Addcategory = (props) => {
  const { addOrEdit, recordForEdit } = props

  const initialFValues = {
    Name:"",
    Percent: '',
    Source_id: '',
    Type:'',
    _id: null
    // Tax_Group_Name: '',
    // Category:''
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('Name' in fieldValues)
      temp.Name = fieldValues.Name ? "" : "No Tax Name Found!"
    if ('Source_id' in fieldValues)
      temp.Source_id = fieldValues.Source_id ? "" : "No Tax Name Found!"
    if ('Type' in fieldValues)
      temp.Type = fieldValues.Type ? "" : "This field is required."
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
          const selctedCategory = e.find(item => item._id === values.Source_id)
          const newvalues = Object.assign(values ,{Source : selctedCategory.Name })
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
      {({ Source, options }) => (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Controls.Input
              name="Name"
              label="Category Name"
              type='text'
              size="small"
              fullWidth
              value={values.Name}
              onChange={handleInputChange}
              error={errors.Name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controls.Select
              label="Select Source"
              name="Source_id"
              size="small"
              fullWidth
              options={Source}
              optionsValue={'_id'}
              optionsDisplay={'Name'}
              value={values.Source_id}
              onChange={handleInputChange}
              error={errors.Source_id}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controls.Select
              label="Select Type"
              name="Type"
              size="small"
              fullWidth
              options={options}
              optionsValue={'name'}
              optionsDisplay={'name'}
              value={values.Type}
              onChange={handleInputChange}
              error={errors.Type}
            />
          </Grid>
          <div>
            <Controls.Button
              type="submit"
              text="Submit"
              color="primary"
              onClick={()=>handleSubmit(Source)}
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



export default Addcategory 











