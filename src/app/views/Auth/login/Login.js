import React from 'react'
import { Link } from 'react-router-dom'
import Titlebar from '../../../TitleBar'
import Controls from '../../../components/controls/Controls'
import { isElectron } from 'react-device-detect'
import '../style.css'
import { connect } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../../../Themes'
import { userLoginFetch } from '../../../store/action/Auth'
import { useForm } from '../../../components/useForm'
import { Grid, Avatar } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.GlobalBox,
    height: '100vh'
  },
  image: {
    backgroundColor: '#636f83',
    // theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'start',
  },
  paper: {
    ...theme.GlobalBox,
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // background: '#00000000'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  window: {
    ...theme.GlobalBox,
    overflow: 'hidden',
    background: '#fff',
    height: '100vh',
  },
  item: {
    ...theme.GlobalBox,
    background: '#ebedef'
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
    // resetForm
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate())
      props.userLoginFetch(values)
  }

  return (
    <ThemeProvider theme={theme}>
      <div >
        <div >
          {isElectron &&
            <div className="titel" >
              <Titlebar color= '#fff' />
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
                  <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Login
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                      <Controls.Input
                        name="username"
                        label="User Name"
                        type='text'
                        size="small"
                        margin="normal"
                        fullWidth
                        value={values.username}
                        error={errors.username}
                        onChange={handleInputChange}
                      />
                      <Controls.Input
                        name="password"
                        label="Password"
                        type="password"
                        size="small"
                        margin="normal"
                        fullWidth
                        value={values.password}
                        error={errors.password}
                        onChange={handleInputChange}

                      />
                      <Controls.Button
                        type="submit"
                        fullWidth
                        size='medium'
                        text="Login"
                        className={classes.submit}
                      />
                      <Grid container>
                        <Grid item>
                          <Link to="/Register" variant="body2">
                            {"Don't have an Register Your Shop? Register"}
                          </Link>
                        </Grid>
                      </Grid>
                    </form>
                  </div>
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