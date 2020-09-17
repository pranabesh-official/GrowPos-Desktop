import React, { useContext, useEffect, useState } from 'react'
import { Grid, Paper } from '@material-ui/core'; //Chip
import Controls from "../../../../../../components/controls/Controls";
import { useForm } from '../.../../../../../../../components/useForm';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { DataContext } from '../../../../../../LocalDB'
import Notification from "../../../../../../components/Notification";
import Popup from '../../../../../../components/Popup'
import PrintIcon from '@material-ui/icons/Print';
import SelectPrinter from './SelectPrinter'

const useStyles = makeStyles((theme) => ({
    Card: {
        ...theme.GlobalBox,
        padding: 2,
        margin: 5,
        background: 'white',
        width: '100%',
        borderTop: '1px solid #f0f0f0'
    },
    CardBody: {
        ...theme.GlobalBox,
        padding: '0 0px',
        background: 'white',
        margin: 5,
        // overflow: 'auto',
    },
    CardAction: {
        ...theme.GlobalBox,
        padding: '0 0px',
        background: 'white',
    },
}));


const BillLayout = (props) => {
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const { editItem, Source } = useContext(DataContext)
    const [openPopup, setOpenPopup] = useState(false)
    const { _id, ShopData } = props.Shop
    const initialFValues = {
        billHeader: 'B.C road Rail Gate , Cooch behar. Contact -9064898395',
        billFooter: 'Thank you For Visiting Us!',
        TC: 'T&C Aplicable',
        print: true,
        preview: false,
        silent: true,
        Source_id: null,
        copies: 1,
        printerName: null,
        timeOutPerLine: 400

    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('billHeader' in fieldValues)
            temp.printerName = fieldValues.printerName ? "" : "Select A Printer !"
        if ('billHeader' in fieldValues)
            temp.billHeader = fieldValues.billHeader ? "" : "This field is required."
        if ('billFooter' in fieldValues)
            temp.billFooter = fieldValues.billFooter ? "" : "This field is required."
        if ('TC' in fieldValues)
            temp.TC = fieldValues.TC ? "" : "This field is required."
        if ('copies' in fieldValues)
            temp.copies = fieldValues.copies ? "" : "This field is required."
        if ('timeOutPerLine' in fieldValues)
            temp.timeOutPerLine = fieldValues.timeOutPerLine ? "" : "This field is required."
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
            if(_id){
                const bill = Object.assign(ShopData , {Bill : values})
                editItem(_id, bill).then(()=>{
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                })
            }else{
                setNotify({
                    isOpen: true,
                    message: 'Fast Create A shop',
                    type: 'error'
                })
            }
        }else{
            setNotify({
                isOpen: true,
                message: 'Select A Printer',
                type: 'error'
            })
        }
    }
    useEffect(() => {
        if(_id){
            if (ShopData.Bill !== null) {
                setValues({
                    ...ShopData.Bill
                })
            }
        }
    }, [ShopData.Bill , _id , setValues])
   
    const classes = useStyles();
    return (
        <Paper className={classes.Card} >
            <Grid container spacing={1} >
                <Grid item xs={12} sm={12} >
                    <Paper className={classes.CardBody} >
                        <Grid container spacing={1} >
                            <Grid item xs={12} sm={12} >
                                <Grid container spacing={1} >
                                    <Grid item xs={12} sm={12} >
                                        <Controls.Input
                                            name="billHeader"
                                            label="Bill Header"
                                            type='text'
                                            value={values.billHeader}
                                            size="small"
                                            fullWidth
                                            error={errors.billHeader}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} >
                                        <Controls.Input
                                            name="billFooter"
                                            label="Bill Footer"
                                            type='text'
                                            value={values.billFooter}
                                            size="small"
                                            fullWidth
                                            error={errors.billFooter}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} >
                                        <Controls.Input
                                            name="TC"
                                            label="T&C"
                                            type='text'
                                            value={values.TC}
                                            size="small"
                                            fullWidth
                                            error={errors.TC}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} >
                                <Grid container spacing={1} >
                                    <Grid item xs={5} sm={5} >
                                        <Controls.Input
                                            name="copies"
                                            label="Copies"
                                            type='number'
                                            size="small"
                                            fullWidth
                                            error={errors.copies}
                                            value={values.copies}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={7} sm={7} >
                                        <Controls.Input
                                            name="timeOutPerLine"
                                            label="Set timeOut Per Line "
                                            type='number'
                                            size="small"
                                            fullWidth
                                            error={errors.timeOutPerLine}
                                            value={values.timeOutPerLine}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} >
                                        <Controls.Checkbox
                                            label="Print Preview"
                                            name="preview"
                                            value={values.preview}
                                            onChange={handleInputChange}
                                        />
                                        <Controls.Checkbox
                                            label="silent"
                                            name="Silent"
                                            value={values.silent}
                                            onChange={handleInputChange}
                                        />
                                        <Controls.Checkbox
                                            label="Print Receipts "
                                            name="print"
                                            value={values.print}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} >
                                        <Controls.Button
                                            text={values.printerName === null ? "No Prnter found!" : `${values.printerName}`}
                                            variant="outlined"
                                            startIcon={<PrintIcon />}
                                            color={values.printerName === null ? "secondary" : "primary"}
                                            className={classes.newButton}
                                            onClick={() => setOpenPopup(true)}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} >
                    <Paper className={classes.CardAction}>
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
                    </Paper>
                </Grid>
            </Grid>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <Popup
                // title={"Tax"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <SelectPrinter
                    values={values}
                    setValues={setValues}
                    setOpenPopup={setOpenPopup}
                    Source={Source}
                    handleInputChange={handleInputChange}
                />
            </Popup>
        </Paper>
    )
}


const mapStateToProps = (state) => {
    return {
        Shop: state.Shop,
    }
}

export default connect(mapStateToProps)(BillLayout);