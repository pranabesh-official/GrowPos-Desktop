import { READ_SHOP_DATA , GET_USER_DATA , GET_PRINTER_SETUP , GET_SHOP_DATA} from './types.js'


export const ReadShop = (data) => {
    return (dispatch) => {
        dispatch({
            type: READ_SHOP_DATA,
            data: data
        })
    }
}

export const UserData = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_USER_DATA,
            data: data
        })
    }
}

export const getPrint= (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_PRINTER_SETUP,
            data: data
        })
    }
}


export const GetShop = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_SHOP_DATA,
            data: data
        })
    }
}
