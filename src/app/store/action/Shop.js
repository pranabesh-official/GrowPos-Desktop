import { READ_SHOP_DATA } from './types.js'


export const ReadShop = (data) => {
    return (dispatch) => {
        dispatch({
            type: READ_SHOP_DATA,
            data: data
        })
    }
}

