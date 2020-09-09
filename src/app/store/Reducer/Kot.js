import { GET_KOT } from '../action/types'

const initialState = {
    Kot: {

    },
    Print: false,
    current: '', 
}



const Kot = (state = initialState, action) => {
    switch (action.type) {
        case GET_KOT:
            return {
                ...state,
                Kot: {
                    ...state.Kot,
                    [action.id]: action.payload,
                    current: action.id
                },
                Print: true
            }
       

        
        default:
            return state
    }
}

export default Kot







