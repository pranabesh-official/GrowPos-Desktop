import { LOGIN_USER, LOGIN_SUCSESS, LOGIN_FAIL, LOGOUT_USER} from '../action/types'

const initialState = {
    islogedIn: false,
    currentUser: null,
    error: null,

}

const Auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                islogedIn: false,
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
                currentUser: null,
            }
        case LOGOUT_USER:
            return {
                ...state,
                currentUser: null,
                islogedIn: false,
            }
        default:
            return state;
    }
}
export default Auth