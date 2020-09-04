import { LOGIN_USER, LOGIN_SUCSESS, LOGIN_FAIL, LOGOUT_USER} from '../action/types'

const initialState = {
    logIn: false,
    currentUser: {},
    islogedIn: false,
    error: null,

}

const Auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                logIn: true
            }
        case LOGIN_SUCSESS:
            return {
                ...state,
                currentUser: action.payload,
                islogedIn: true,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
                islogedIn: false,
                logIn: false
            }
        case LOGOUT_USER:
            return {
                ...state,
                currentUser: {},
                islogedIn: false,
                logIn: false
            }
        default:
            return state;
    }
}
export default Auth