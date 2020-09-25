import axios from 'axios'

import { LOGIN_USER, LOGIN_SUCSESS, LOGIN_FAIL, LOGOUT_USER } from './types.js'

const baseurl = 'http://localhost:4545'
export const userPostFetch = (user, pass) => {
    var data = JSON.stringify({ username: user, password: pass });
    return dispatch => {
        let login = {
            method: 'post',
            url: baseurl + '/users/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }
        return axios(login)
            .then(({ data }) => {
                if (data.user) {
                    sessionStorage.setItem("token", data.token)
                    sessionStorage.setItem("public_id", data.user._id)
                    dispatch(loginUser())
                } else {
                    loginfaild(data.message)
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
        const token = sessionStorage.getItem("token")
        // const public_id = sessionStorage.public_id;
        let getUser = {
            method: 'get',
            url: baseurl + '/users/me',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        if (token) {
            if (page === 'LOGIN') {
                dispatch(loginUser())

            }
            return axios(getUser)
                .then(({ data }) => {
                    if (data) {
                        dispatch(GetcurrentUser(data))
                    } else {
                        sessionStorage.removeItem("token")
                        sessionStorage.removeItem("public_id")
                        dispatch(loginfaild(data.message))
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
    const token = sessionStorage.getItem("token")
    let logout = {
        method: 'get',
        url: baseurl + '/users/logout',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    axios(logout)
        .then(({ data }) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
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


