import { STORE_KOT, CLEAR_KOT, GET_ORDER_TICKETS} from '../action/types'

const initialState = {
    Kot: {
        crear : false,

    },
    OrderTicket:[]
}
const Kot = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_TICKETS:
            return {
                ...state,
                OrderTicket: action.data,
            }
        case STORE_KOT:
            const old = state.Kot[action.payload]
            let arry = []
            const data = {
                SaveItem:action.Data,
                date:action.date,
                time:action.time,
            }
            if(old){
                arry = old.saveData
                arry.push(data)
            }else{
                arry.push(data)
            }
            return {
                ...state,
                Kot:{
                    ...state.Kot,
                    [action.payload]:{
                        saveData:arry
                    }
                }

            }
        case CLEAR_KOT:
            return {
                ...state,
                Kot:{
                    ...state.Kot,
                    [action.payload]:{}
                }
            }


        default:
            return state
    }
}

export default Kot







