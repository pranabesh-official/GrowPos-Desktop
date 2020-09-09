import { GET_KOT } from './types.js'


export const GetKot = ( payload , id) => {
    return (dispatch) => {
        dispatch({
            type: GET_KOT,
            payload: payload,
            id: id
        })
    }
}