import React, { useContext, useState } from 'react'
import { Grid } from '@material-ui/core'; //Chip
import Controls from "../../../../components/controls/Controls";
import { useForm } from '../../../../components/useForm';
import { DataContext } from '../../../../LocalDB' //DataContext
import Notification from "../../../../components/Notification";




const TaxGroup = (props) => {
    const { addItem } = useContext(DataContext)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const initialFValues = {
        Name: '',
        TaxNo: '',
    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Name' in fieldValues)
            temp.Name = fieldValues.Name ? "" : "This field is required."
        if ('TaxNo' in fieldValues)
            temp.TaxNo = fieldValues.TaxNo ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addItem('TaxGroup', values).then(() => {
                setNotify({
                    isOpen: true,
                    message: 'Submitted Successfully',
                    type: 'success'
                })
                resetForm()
            })
        }
    }

    return (

        <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
                <Controls.Input
                    name="Name"
                    label="Tax Name"
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
                    name="TaxNo"
                    label="Tax No"
                    type="text"
                    size="small"
                    fullWidth
                    value={values.TaxNo}
                    onChange={handleInputChange}
                    error={errors.TaxNo}
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
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </Grid>
    )
}



export default TaxGroup 