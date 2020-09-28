import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'; //Chip
import Controls from "../../../components/controls/Controls";
import { useForm } from '../../../components/useForm';
import { DataConsumer } from '../../../LocalDB' //DataContext




const CashManage = (props) => {
    const { addOrEdit, recordForEdit , SelectType} = props

    const initialFValues = {
        Register: "",
        Type: "CashOut",
        Amount: 0,
        Note: "",
        _id: null

    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Register' in fieldValues)
            temp.Register = fieldValues.Register ? "" : "Select A Register"
        if ('Type' in fieldValues)
            temp.Type = fieldValues.Type ? "" : "This field is required."
        if ('Amount' in fieldValues)
            temp.Amount = fieldValues.Amount ? "" : "This field is required."
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
            {({ Registers }) => (
                <Grid container spacing={1} style={{ maxWidth: 400 }}>
                    <Grid item xs={12} sm={12}>
                        <Controls.Select
                            label="Select Register"
                            name="Register"
                            size="small"
                            fullWidth
                            options={Registers}
                            optionsValue={'_id'}
                            optionsDisplay={'Name'}
                            value={values.Register}
                            onChange={handleInputChange}
                            error={errors.Register}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Controls.RadioGroup
                            name="Type"
                            size="small"
                            fullWidth
                            options={SelectType}
                            optionsValue={'_id'}
                            optionsDisplay={'Name'}
                            value={values.Type}
                            onChange={handleInputChange}
                            error={errors.Type}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Controls.Input
                            name="Amount"
                            label="Amount"
                            type="number"
                            size="small"
                            fullWidth
                            value={values.Amount}
                            onChange={handleInputChange}
                            error={errors.Amount}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Controls.Input
                            name="Note"
                            label="Add Note (optinoal)"
                            type="text"
                            size="small"
                            fullWidth
                            value={values.Note}
                            onChange={handleInputChange}
                            error={errors.Note}
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



export default CashManage
