import React, {  useContext } from 'react'
import Titlebar from '../../../TitleBar'
import Controls from '../../../components/controls/Controls'
import { isElectron } from 'react-device-detect'
import '../style.css'
import '../layout.css'
import { connect } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../../Themes'
import { userLoginFetch } from '../../../store/action/Auth'
import { useForm } from '../../../components/useForm'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { authenticate, isAuth } from '../../../helpers/auth'
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import { DataContext } from '../../../LocalDB'
import { userPostFetch } from '../../../store/action/Auth'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.GlobalBox,
    height: '100vh'
  },
  image: {
    backgroundColor: '#636f83',
    backgroundSize: 'cover',
    backgroundPosition: 'start',
  },
  paper: {
    ...theme.GlobalBox,
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: '#321fdb'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  window: {
    ...theme.GlobalBox,
    overflow: 'hidden',
    background: '##DAF7A6',
    height: '100vh',
  },
  item: {
    ...theme.GlobalBox,
    background: '##DAF7A6'
  },
  Card: {
    maxWidth: 345,
    borderRadius: '25px',
    background: '#f0f8ff',
  },
  media: {
    height: 140,
  },
  input: {
    borderRadius: '25px',
    color: '#321fdb'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}));
const Login = (props) => {
  const classes = useStyles();
  const { addItem } = useContext(DataContext)
  const {  _id } = props.Shop

  const initialFValues = {
    username: '',
    password: '',
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('username' in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required."
    if ('password' in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required."
    if ('password' in fieldValues)
      temp.password = fieldValues.password.length > 7 ? "" : "Minimum Length 8."
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
    setValues,
    validateOnChange
  } = useForm(initialFValues, true, validate);

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
    if (validateOnChange)
      validate({ [name]: value })
  }
  const url = 'http://localhost:5000/api'
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (isAuth()) {
        props.userLoginFetch(values)
      } else {        axios
          .post(`${url}/login`, {
            email: values.username,
            password: values.password
          })
          .then(res => {
            authenticate(res, () => {
              isAuth() && isAuth().role === 'admin'
                ? props.history.push('/admin')
                : props.history.push('/private');
                console.log(values.username , values.password)
                console.log(res.data.user);
                if(_id){
                  props.userLoginFetch(values)
                }else{
                  addItem('Shop', {
                    Name: res.data.user.name,
                    Type: 'Resturant',
                    Contact: res.data.user.contact,
                    Location: res.data.user.location,
                    Pin: '1234',
                    Bill: null,
                    OT: null,
                    Preferences: null
                  }).then((result) => {
                    props.userPostFetch({
                      username: values.username,
                      password: values.password,
                      Mobile: res.data.user.contact,
                      City: res.data.user.location,
                      shopid:result._id
                    })
                  })
                }
            });
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    }
  }
  const buttonClassname = clsx({
    [classes.buttonSuccess]: isAuth(),
  });
  return (
    <ThemeProvider theme={theme}>
      <div style={{ background: '#0000000' }}>
        <div >
          {isElectron &&
            <div className="titel" >
              <Titlebar color='#00000000' />
            </div>
          }
          <div>
            <img className="wave" src={'http://localhost:4545/static/img/NewWave.png'} alt="NewWave" />
            <div className="myDiv">
              <div className="img">
                <img src={'http://localhost:4545/static/img/logo.png'} alt="bg" />
              </div>
              <div className="login-content">
                <Grid item xs={12} sm={12} md={12} elevation={6}>
                  <Card className={classes.Card}>
                    <CardContent>
                      <div className={classes.paper}>
                        <div className={classes.wrapper}>
                          <Fab
                            aria-label="save"
                            color="primary"
                            className={buttonClassname}
                            onClick={isAuth}
                          >
                            {isAuth() ? <CheckIcon /> : <LockOutlinedIcon />}
                          </Fab>
                          {isAuth() && <CircularProgress size={68} className={classes.fabProgress} />}
                        </div>
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                          <Controls.Input
                            name="username"
                            label="User Name"
                            type='text'
                            size="small"
                            InputProps={{
                              classes: {
                                root: classes.input,
                              },
                            }}
                            margin="normal"
                            fullWidth
                            style={{ borderRadius: '25px' }}
                            value={values.username}
                            error={errors.username}
                            onChange={handleInputChange}
                          />
                          <Controls.Input
                            name="password"
                            label="Password"
                            type="password"
                            size="small"
                            InputProps={{
                              classes: {
                                root: classes.input,
                              },
                            }}
                            style={{ borderRadius: '25px' }}
                            margin="normal"
                            fullWidth
                            value={values.password}
                            error={errors.password}
                            onChange={handleInputChange}
                          />
                          <Controls.Button
                            type="submit"
                            fullWidth
                            style={{ borderRadius: '25px' }}
                            size='medium'
                            text="Login"
                            className={classes.submit}
                          />
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider >
  )
}

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    Shop: state.Shop,
  }
}

const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo)),
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
