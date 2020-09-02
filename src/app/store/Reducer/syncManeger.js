import { SYNC_DB, SYNC_DB_RESET, SET_CURRENT_TAB, SYNC_CHAECK, SYNC_START, SYNC_DONE } from '../action/types'
const initialState = {
    Sync: false,
    isSync: false,
    change: 0,
    AddItem: 0,
    DeleteItem: 0,
    currentTab: 'Pos'
}

const SyncData = (state = initialState, action) => {
    switch (action.type) {
        case SYNC_DB:
            if (action.payload === 'AddItem') {
                return {
                    ...state,
                    change: state.change + 1,
                    AddItem: state.AddItem + 1,
                   
                }
            } if (action.payload === 'DeleteItem') {
                return {
                    ...state,
                    change: state.change + 1,
                    DeleteItem: state.DeleteItem + 1,
                    
                }

            } else {
                return { ...state }
            }
        case SYNC_DB_RESET:
            return {
                ...state,
                change: 0,
                AddItem: 0,
                DeleteItem: 0,
            }
        case SYNC_CHAECK:
            return {
                ...state,
                change: state.change + 1,
                AddItem: state.AddItem + 1
            }
        case SYNC_START:
            return {
                ...state,
                isSync:true,
                Sync: true,
            }
        case SYNC_DONE:
            return {
                ...state,
                isSync:false,
                Sync: false,
            }
        case SET_CURRENT_TAB:
            return {
                ...state,
                currentTab: action.payload
            }
        default: return state
    }
}


export default SyncData