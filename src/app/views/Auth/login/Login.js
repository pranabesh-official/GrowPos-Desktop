import React from 'react'
// import { Link } from 'react-router-dom'
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
import { Grid ,Avatar , Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


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
    color:'#321fdb'
  }
}));
const Login = (props) => {
  const classes = useStyles();
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
    handleInputChange,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate())
      props.userLoginFetch(values)
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{background:'#0000000'}}>
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
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                          </Avatar>
                          <Typography component="h1" variant="h5">
                            Login
                          </Typography>
                        {/* <form class="tabber">
                          <label for="t1"><LockOutlinedIcon style={{ color:'#321fdb', size:'20px'}}/></label>
                          <input id="t1" name="food" type="radio" checked />
                          <label for="t2"><LockOutlinedIcon style={{ color:'#321fdb', size:'20px'}}/></label>
                          <input id="t2" name="food" type="radio" />
                          <div class="blob"></div>
                        </form> */}
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



const mapDispatchToProps = dispatch => ({
  userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})
export default connect(null, mapDispatchToProps)(Login);
// export default connect(mapStateToProps, {userPostFetch, getProfileFetch})(Login)

// , {userPostFetch, getProfileFetch}


{/* <Grid container>
                        <Grid item>
                          <Link to="/Register" variant="body2">
                            {"Don't have an Register Your Shop? Register"}
                          </Link>
                        </Grid>
                      </Grid> */}