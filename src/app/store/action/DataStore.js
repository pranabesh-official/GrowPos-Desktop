import { READ_DATA, LOAD_START, LOAD_SUCSESS, LOAD_FAIL } from './types.js'


export const ReadData = (name, data) => {
    return (dispatch) => {
        dispatch({
            type: READ_DATA,
            name: name,
            data: data
        })
    }
}

export const LoadStart = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_START,
        })
    }
}

export const LoadSucsess = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_SUCSESS,
        })
    }
}

export const LoadFail = (err) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_FAIL,
            err:err
        })
    }
}