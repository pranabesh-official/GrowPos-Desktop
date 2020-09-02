import { READ_DATA, LOAD_START, LOAD_SUCSESS, LOAD_FAIL } from '../action/types'

const initialState = {
    lodding: false,
    dataload: false,
    Source: [],
    Category: [],
    Tax: [],
    Products: [],
    Tables: [],
    options: [
        { name: 'Manufactured', id: 1 },
        { name: 'Purchased', id: 2 },
        { name: 'Others', id: 3 }
    ],
    tableStatus: [
        { name: 'Active', id: 1 },
        { name: 'Inactive', id: 2 },
        { name: 'Pending', id: 3 },
        { name: 'Banned', id: 3 },
    ],
    error:null
}

const DataStore = (state = initialState, action) => {

    switch (action.type) {
        case READ_DATA:
            return {
                ...state,
                [action.name]: action.data,
            }
        case LOAD_START:
            return {
                ...state,
                lodding: true,
                dataload:false
            }
        case LOAD_SUCSESS:
            return {
                ...state,
                lodding: false,
                dataload:true
            }
        case LOAD_FAIL:
            return {
                ...state,
                lodding: false,
                dataload:false,
                error: action.err
            }
        default: return state
    }

}


export default DataStore