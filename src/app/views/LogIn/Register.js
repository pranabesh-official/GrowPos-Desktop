import React, { useContext, useEffect, useState } from 'react'
import './css/style.css'
import './css/font-awesome-4.7.0/css/font-awesome.min.css'
import './css/main.css'
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import Controls from '../../components/controls/Controls'
import { useForm } from '../../components/useForm'
import { connect } from 'react-redux'
import { DataContext } from '../../LocalDB'
import Notification from "../../components/Notification";
import { Icon } from 'semantic-ui-react'
// import { GoogleLogin } from 'react-google-login';

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: 25,
        margin: theme.spacing(0.5),
        height: 50
    },
    label: {
        textTransform: 'none'
    }
}))

const Register = (props) => {
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [loading, setLoading] = useState(false)
    const [Show, setShow] = useState(false)
    const { addItem } = useContext(DataContext)
    // const { adduser } = useContext(ShopHandeler)
    const { ShopType, _id, ShopData } = props.Shop
    // const { handleClose } = props
    const initialFValues = {
        Name: '',
        Type: '',
        Contact: '',
        Location: '',
        username: 'superuser',
        password: '12345678'
    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Name' in fieldValues)
            temp.Name = fieldValues.Name ? "" : "This field is required."
        if ('Type' in fieldValues)
            temp.Type = fieldValues.Type ? "" : "This field is required."
        if ('Contact' in fieldValues)
            temp.Contact = fieldValues.Contact ? "" : "This field is required."
        if ('Location' in fieldValues)
            temp.Location = fieldValues.Location ? "" : "This field is required."
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
        // resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {

        e.preventDefault()
        if (values.Name && values.Type && values.Contact && values.Location) {
            setLoading(true)
            if (_id) {
                setNotify({
                    isOpen: true,
                    message: 'Your Shop Alrady Createed!',
                    type: 'error'
                })
                setLoading(false)
            } else {
                const data = {
                    Name: values.Name,
                    Type: values.Type,
                    Contact: values.Contact,
                    Location: values.Location,
                    DeletePin: true,
                    EditTax: false,
                    EditCategory: true,
                    EditProducts: true,
                    EditSource: false,
                    Pin: '1234',
                    roundOff: false,
                    printBill: true,
                    printOt: true,
                    billFast: true,
                    OtNo: true,
                    discountOffer: true,
                    Bill: null,
                    OT: null,
                }
                addItem('Shop', data).then((result) => {
                    setLoading(false)
                    console.log('Shop', result)
                    setShow(true)
                })
            }
        }

    }

    const classes = useStyles();
    useEffect(() => {
        if (ShopData) {
            setValues({
                ...ShopData
            })
        }
    }, [ShopData, setValues])
    const Shop = () => {
        return (<div className="login-content">
            <form className="form" name="form">
                <span className="login100-form-title">
                    Register
            </span>
                <div className="wrap-input100 validate-input">
                    <input
                        className="input100"

                        placeholder="Shop Name"
                        name="Name"
                        value={values.Name}
                        onChange={handleInputChange}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <i className="fa fa-home" aria-hidden="true"></i>
                    </span>
                </div>
                <div className="wrap-input100 validate-input">
                    <input
                        className="input100"

                        placeholder="Location"
                        name="Location"
                        value={values.Location}
                        onChange={handleInputChange}

                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </span>
                </div>
                <div className="wrap-input100 validate-input">
                    <input
                        className="input100"

                        placeholder="Contact"
                        name="Contact"
                        value={values.Contact}
                        onChange={handleInputChange}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                        <i className="fa fa-mobile" aria-hidden="true"></i>
                    </span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Password is required">
                    <Controls.RadioGroup
                        name="Type"
                        value={values.Type}
                        options={ShopType}
                        optionsValue={'name'}
                        size="small"
                        error={errors.Type}
                        optionsDisplay={'display'}
                        onChange={handleInputChange}

                    />
                </div>
                <div className="container-login100-form-btn">
                    <MuiButton
                        type="submit"
                        color={"primary"}
                        startIcon={loading && <Icon loading name='spinner' size="small" />}
                        classes={{ root: classes.root, label: classes.label }}
                        variant={"contained"}
                        fullWidth
                        onClick={handleSubmit}
                    >Register
            </MuiButton>
                </div>
            </form>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </div>
        )

    }
    const Swow = () => {
        return (
            <div className="login-content">
                <form className="form" name="form" >
                    <span className="login100-form-title">
                        Default
                    </span>
                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" placeholder="Enter Username" name="username" value={'superuser'} />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Password is required" >
                        <input className="input100" type="text" placeholder="Enter Password" name="password" value={'12345678'} />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="container-login100-form-btn">
                        <h6 style={{ fontSize: 12, margin: 5, }}>Login With this Details! after login you can chenge details! </h6>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <>
            {Show ? Swow() : Shop()}
        </>
    )
}


const mapStateToProps = (state) => {
    return {
        Shop: state.Shop,
    }
}

export default connect(mapStateToProps)(Register);
// onSubmit={this.handleSubmit}
// export default Register