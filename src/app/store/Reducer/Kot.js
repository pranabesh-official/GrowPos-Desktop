import { STORE_KOT, CLEAR_KOT, GET_ORDER_TICKETS} from '../action/types'

const initialState = {
    Kot: {},
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
            return {
                ...state,
                Kot:{
                    ...state.Kot,
                    [action.payload]:{
                        ...state.Kot[action.payload],
                        [action.id]:{
                            cart:action.Data,
                            date:action.date,
                            time:action.time,
                        }
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







