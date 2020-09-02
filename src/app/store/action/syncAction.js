import {SYNC_DB , SET_CURRENT_TAB, SYNC_DB_RESET, SYNC_CHAECK ,SYNC_START, SYNC_DONE} from './types.js'

export const SyncDb =(payload )=>{
    return(dispatch) =>{
        dispatch({
            type : SYNC_DB,
            payload: payload,
        })
    }
}

export const SyncDbReset =()=>{
    return(dispatch) =>{
        dispatch({
            type : SYNC_DB_RESET,
        })
    }
}

export const SyncChaeck =()=>{
    return(dispatch) =>{
        dispatch({
            type : SYNC_CHAECK,
        })
    }
}

export const isSyncStart =()=>{
    return(dispatch) =>{
        dispatch({
            type : SYNC_START,
        })
    }
}
export const isSyncDone =()=>{
    return(dispatch) =>{
        dispatch({
            type : SYNC_DONE,
        })
    }
}
export const CurrentTab =(payload)=>{
    return(dispatch) =>{
        dispatch({
            type : SET_CURRENT_TAB,
            payload: payload
        })
    }
}