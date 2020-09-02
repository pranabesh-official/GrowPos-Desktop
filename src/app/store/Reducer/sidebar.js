const initialState = {
  sidebarShow: 'responsive',
  minimize: true
}

const Setminimize = 'Setminimize'

export const MinimizeHandler = (payload) => {
  return (dispatch) => {
      dispatch({
          type: Setminimize,
          payload: payload
      })
  }
}


const changeState = (state = initialState,{ type, ...rest }) => {
    switch (type) {
      case 'set':
        return {...state, ...rest }
      case Setminimize:
        return {
          ...state,
          minimize: type.payload
        }
      default:
        return state
    }
  }

export default changeState