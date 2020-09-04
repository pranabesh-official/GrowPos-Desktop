import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"
import { isElectron } from 'react-device-detect'
import Titlebar from '../../TitleBar'
import { userPostFetch, getProfileFetch } from '../../store/action/Auth'


import './css/style.css'
import './css/font-awesome-4.7.0/css/font-awesome.min.css'
import './css/main.css'
import NewWave from './css/img/NewWave.png';
import bg from './css/img/bg.png';



class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            logedIn: true,
            loading: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentWillMount() {
        try {
            this.props.getProfileFetch('LOGIN')
        } catch (error) {

        }
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const { username, password } = this.state
        if (username && password) {
            this.props.userPostFetch(username, password)
        }
    }
    render() {
        const { logIn } = this.props.Auth
        console.log(logIn)
        const layout = () => {
            const { username, password } = this.state;
            return (
                <>
                    {isElectron && <Titlebar />}
                    <div>
                        <img className="wave" src={NewWave} alt="NewWave"></img>
                        <div className="container">
                            <div className="img">
                                <img src={bg} alt="bg" />
                            </div>
                            <div className="login-content">
                                <form className="form" name="form" onSubmit={this.handleSubmit}>
                                    <span className="login100-form-title">
                                        Login
                                </span>
                                    <div className="wrap-input100 validate-input">
                                        <input className="input100" type="text" placeholder="Enter Username" name="username" value={username} onChange={this.handleChange} />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="wrap-input100 validate-input" data-validate="Password is required">
                                        <input className="input100" type="password" placeholder="Enter Password" name="password" value={password} onChange={this.handleChange} />
                                        <span className="focus-input100"></span>
                                        <span className="symbol-input100">
                                            <i className="fa fa-lock" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="container-login100-form-btn">
                                        <button type="submit" className="login100-form-btn">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

        if (logIn) {
            return (
                <Redirect to={'/dashbord'} />
            )
        } else {
            return (
                <>
                    {layout()}
                </>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        Auth: state.Auth,
    }
}
export default connect(mapStateToProps, { userPostFetch, getProfileFetch })(Login)




