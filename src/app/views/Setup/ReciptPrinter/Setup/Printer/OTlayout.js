import React, { useContext, useEffect, useState } from 'react'
import { Grid, Paper } from '@material-ui/core'; //Chip
import Controls from "../../../../../components/controls/Controls";
import { useForm } from '../../../../../components/useForm';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { DataContext } from '../../../../../LocalDB'
import Notification from "../../../../../components/Notification";
import Popup from '../../../../../components/Popup'
import PrintIcon from '@material-ui/icons/Print';
import SelectPrinter from './SelectPrinter'

const useStyles = makeStyles((theme) => ({
    Card: {
        ...theme.GlobalBox,
        padding: 2,
        margin: 5,
        background: 'white',
        width: '100%',
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


const Otlayout = (props) => {
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const { editItem, Source } = useContext(DataContext)
    const [openPopup, setOpenPopup] = useState(false)
    const { _id, ShopData } = props.Shop
    const initialFValues = {
        Name: 'KOT',
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
        if ('copies' in fieldValues)
            temp.printerName = fieldValues.printerName ? "" : "Select A Printer !"
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
                const OT = Object.assign(ShopData , {OT : values})
                editItem(_id, OT).then(()=>{
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
            if (ShopData.OT !== null) {
                setValues({
                    ...ShopData.OT
                })
            }
        }
    }, [ShopData.OT , _id , setValues])

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
                                            name="Name"
                                            label="Order Ticket Name"
                                            type='text'
                                            value={values.Name}
                                            size="small"
                                            fullWidth
                                            error={errors.Name}
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
                                            label="Silent"
                                            name="silent"
                                            value={values.silent}
                                            onChange={handleInputChange}
                                        />
                                        <Controls.Checkbox
                                            label="Print Receipts on Save "
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

export default connect(mapStateToProps)(Otlayout);