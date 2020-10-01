import axios from 'axios'

import { LOGIN_SUCSESS, LOGIN_FAIL } from './types.js'

const baseurl = 'http://localhost:4545'

export const userPostFetch = user => {
  
    const data = Object.assign(user, {
        EmpolyeName: "Admin",
        Gender: null,
        Department: "Admin",
        Haier_Date: new Date(),
        admin: true,
        Salary: 0,

    })
    console.log(data)
    return dispatch => {
        const config = {
            method: 'post',
            url: baseurl + '/users',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };
        return axios(config)
            .then(({ data }) => {
                if (data.user) {
                    sessionStorage.setItem("token", data.token)
                    sessionStorage.setItem("admin", data.user.admin)
                    dispatch(loginUser(data.user))
                } else {
                    loginfaild()
                }

            })
            .catch((error) => {
                console.log(error)
                dispatch(loginfaild(error))
            })
    }
}


export const userLoginFetch = (data) => {
    // const data = JSON.stringify({ username: user, password: pass });
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
                    sessionStorage.setItem("admin", data.user.admin)
                    dispatch(loginUser(data.user))
                } else {
                    loginfaild()
                }

            })
            .catch((error) => {
                console.log(error)
                dispatch(loginfaild(error))
            })
    }
}
export const getProfileFetch = () => {
    return dispatch => {
        const token = sessionStorage.getItem("token")
        if (token) {
            let getUser = {
                method: 'get',
                url: baseurl + '/users/me',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            return axios(getUser)
                .then(({ data }) => {
                    if (data) {
                        dispatch(loginUser(data))
                    } else {
                        sessionStorage.removeItem("token")
                        sessionStorage.removeItem("admin")
                        dispatch(loginfaild(data.message))
                    }
                })
                .catch((error) => {
                    console.log(error)
                    sessionStorage.removeItem("token")
                    sessionStorage.removeItem("admin")
                    dispatch(loginfaild(error))
                })
        } else {
            dispatch(loginfaild('Login Failed'))
        }

    }
}

export const LogOut = () => {
    return dispatch => {
        const token = sessionStorage.getItem("token")
        let logout = {
            method: 'get',
            url: baseurl + '/users/logout',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return axios(logout)
            .then(({ data }) => {
                console.log(data)
                sessionStorage.removeItem("token")
                sessionStorage.removeItem("admin")
                dispatch(loginfaild())
            })
            .catch((error) => {
                console.log(error)
            })
    }
}


const loginUser = (userData) => ({
    type: LOGIN_SUCSESS,
    payload: userData
})

const loginfaild = (userData) => ({
    type: LOGIN_FAIL,
    payload: userData
})


