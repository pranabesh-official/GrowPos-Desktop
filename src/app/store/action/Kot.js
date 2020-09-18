import {  CLEAR_KOT , STORE_KOT ,GET_ORDER_TICKETS} from './types.js'


export const StoreKot = ( payload , id , Data, date, time) => {
    return (dispatch) => {
        dispatch({
            type: STORE_KOT,
            payload: payload,
            id: id,
            Data:Data,
            date:date,
            time:time
        })
    }
}

export const ClearKot = ( payload ) => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_KOT,
            payload: payload,
        })
    }
}

export const getOrderTicket = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_ORDER_TICKETS,
            data: data
        })
    }
}