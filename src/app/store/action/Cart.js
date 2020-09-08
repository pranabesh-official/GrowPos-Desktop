import { SELECT_CLIENT , ADD_TO_CART , DELETE_FROM_CART , REMOVE_FROM_CART , ADD_FROM_CART , GET_CART_DATA} from './types.js'


export const SelectClient = ( payload) => {
    return (dispatch) => {
        dispatch({
            type: SELECT_CLIENT,
            payload: payload
        })
    }
}

export const getCart = ( cartData , tabels) => {

    return (dispatch) => {
        dispatch({
            type: GET_CART_DATA,
            cartData: cartData,
            tabels: tabels
        })
    }
}
export const addToCart = ( payload) => {
    return (dispatch) => {
        dispatch({
            type: ADD_TO_CART,
            payload: payload
        })
    }
}

export const add = ( payload) => {
    return (dispatch) => {
        dispatch({
            type: ADD_FROM_CART,
            payload: payload
        })
    }
}

export const remove = ( payload) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: payload
        })
    }
}

export const Delete = ( payload) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_FROM_CART,
            payload: payload
        })
    }
}