import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CForm,
  CInputGroup,
  CRow
} from '@coreui/react'
import Titlebar from '../../../TitleBar'
import Controls from '../../../components/controls/Controls'
import { isElectron } from 'react-device-detect'
import '../style.css'
import { connect } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../../Themes'
import { userPostFetch } from '../../../store/action/Auth'
import { useForm } from '../../../components/useForm'
import { DataContext } from '../../../LocalDB'
import Notification from "../../../components/Notification";

const Register = (props) => {
  const { addItem } = useContext(DataContext)
  const { ShopType, _id, ShopData } = props.Shop
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const initialFValues = {
    Name: '',
    Type: 'Resturant',
    Contact: '',
    Location: '',
    username: '',
    password: '',
    re_password: '',
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
    if ('username' in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required."
    if ('password' in fieldValues)
      temp.password = fieldValues.password.length > 7 ? "" : "Minimum Length 8."
    if ('re_password' in fieldValues)
      temp.re_password = fieldValues.re_password === fieldValues.password ? "" : "Password Not Match"
    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }
  const {
    values,
    errors,
    setValues,
    setErrors,
    handleInputChange,
    // resetForm
  } = useForm(initialFValues, true, validate);

  useEffect(() => {
    if (ShopData !== null)
      setValues({
        ...ShopData,
        username: '',
        password: '',
        re_password: ''
      })
  }, [ShopData, setValues])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (_id) {
        setNotify({
          isOpen: true,
          message: 'You are alredy Register your Shop!',
          type: 'success'
        })
      } else {
        addItem('Shop', {
          Name: values.Name,
          Type: values.Type,
          Contact: values.Contact,
          Location: values.Location,
          Pin: '1234',
          Bill: null,
          OT: null,
          Preferences: null
        }).then((result) => {
          console.log(result)
          props.userPostFetch({
            username: values.username,
            password: values.password,
            Mobile: values.Contact,
            City: values.Location,
            shopid: result._id
          })
        })
      }
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <div className="c-app c-default-layout flex-row align-items-center window" >
        <div >
          {isElectron &&
            <div className="titel">
              <Titlebar />
            </div>
          }
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Register</h1>
                      <p className="text-muted">Set Up Your Shop!</p>
                      <CInputGroup className="mb-3">
                        <Controls.Input
                          name="Name"
                          label="Shop Name"
                          type='text'
                          size="small"
                          fullWidth
                          value={values.Name}
                          error={errors.Name}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <Controls.Input
                          name="Contact"
                          label="Shop Contact"
                          type='text'
                          size="small"
                          fullWidth
                          value={values.Contact}
                          error={errors.Contact}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <Controls.Input
                          name="Location"
                          label="Location"
                          type='text'
                          size="small"
                          fullWidth
                          value={values.Location}
                          error={errors.Location}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <Controls.Input
                          name="username"
                          label="User Name"
                          type='text'
                          size="small"
                          fullWidth
                          value={values.username}
                          error={errors.username}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <Controls.Input
                          name="password"
                          label="Password"
                          type="password"
                          size="small"
                          fullWidth
                          value={values.password}
                          error={errors.password}
                          onChange={handleInputChange}

                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <Controls.Input
                          name="re_password"
                          label="Re Enter Password"
                          type="password"
                          size="small"
                          fullWidth
                          value={values.re_password}
                          error={errors.re_password}
                          onChange={handleInputChange}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
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
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <Controls.Button
                            text='Register'
                            size='medium'
                            onClick={handleSubmit}
                          />
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        This is a Pos Software for food, drink, Cafe and more..
                        if you don't  Register your shop fill this from and start your billing.
                      </p>
                      <Link to="/login">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>Login Now!</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </div>
      </div>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </ThemeProvider>
  )
}

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    Shop: state.Shop,
  }
}

const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);


