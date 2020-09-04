import axios from 'axios'

import { LOGIN_USER, LOGIN_SUCSESS, LOGIN_FAIL, LOGOUT_USER } from './types.js'

const baseurl = 'http://127.0.0.1:5000/'
export const userPostFetch = (user, pass) => {
    return dispatch => {
        const base64 = require('base-64');
        let basic = 'Basic ' + base64.encode(user + ":" + pass)
        let login = {
            method: 'get',
            url: 'http://127.0.0.1:5000/login',
            headers: {
                'Authorization': basic,
            }
        }
        return axios(login)
            .then(({ data }) => {
                if (data.message) {
                    loginfaild(data.message)
                } else {
                    sessionStorage.setItem("token", data.token)
                    sessionStorage.setItem("public_id", data.public_id)
                    dispatch(loginUser())
                }

            })
            .catch((error) => {
                console.log(error)
                dispatch(loginfaild(error))
            })
    }
}
export const getProfileFetch = (page) => {
    return dispatch => {

        const token = sessionStorage.token;
        const public_id = sessionStorage.public_id;
        let getUser = {
            method: 'get',
            url: baseurl + 'user/' + public_id,
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
        }
        if (token) {
            if (page === 'LOGIN') {
                dispatch(loginUser())
            }
            return axios(getUser)
                .then(({ data }) => {
                    if (data.message) {
                        sessionStorage.removeItem("token")
                        sessionStorage.removeItem("public_id")
                        dispatch(loginfaild(data.message))

                    } else {
                        dispatch(GetcurrentUser(data))
                    }
                })
                .catch((error) => {
                    console.log(error)
                    sessionStorage.removeItem("token")
                    sessionStorage.removeItem("public_id")
                    dispatch(loginfaild(error))
                })
        } else {
            dispatch(loginfaild('Login Failed'))
        }

    }
}

export const LogOut = (name, data) => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("public_id")
    return (dispatch) => {
        dispatch({
            type: LOGOUT_USER,
        })
    }
}
const loginUser = () => ({
    type: LOGIN_USER,
})

const GetcurrentUser = (userData) => ({
    type: LOGIN_SUCSESS,
    payload: userData
})

const loginfaild = (userData) => ({
    type: LOGIN_FAIL,
    payload: userData
})


