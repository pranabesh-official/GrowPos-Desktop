import { SELECT_CLIENT, ADD_TO_CART, DELETE_FROM_CART, REMOVE_FROM_CART, ADD_FROM_CART, GET_CART_DATA, KOT_RESET } from '../action/types'

const initialState = {
  Cart: {
    tableLoad: false,
  },
  selectClient: null,
  getData: false,
  kot: {},
  kotPrinted: false
}

const updateObject = (oldObject, newValues) => {
  return Object.assign({}, oldObject, newValues)
}

const cartItemInArray = (array, itemId, updateItemCallback) => {
  const updatedItems = array.map(item => {
    if (item._id !== itemId._id) {
      return item
    }
    const updatedItem = updateItemCallback(item)
    return updatedItem
  })
  return updatedItems
}

const Cart = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CLIENT:
      return {
        ...state,
        selectClient: action.payload,
      }
    case GET_CART_DATA:
      if (state.getData === false) {
        const Carts = state.Cart
        let NewCarts = null
        action.tabels.forEach((element) => {
          if (element._id) {
            NewCarts = Object.assign(Carts, { [element._id]: [], tableLoad: true })
          }
        })
        action.cartData.forEach((element) => {
          NewCarts = Object.assign(Carts, element)
        })
        if(state.kotPrinted === false ){
          return {
            ...state,
            Cart: NewCarts,
            getData:true,
            kot:NewCarts
          }
        }else{
          return {
            ...state,
            Cart: NewCarts,
            getData:true,
          }
        } 
      }else{
        return {
          ...state,
        }
      }

    case ADD_TO_CART:
      const [filter] = state.Cart[state.selectClient._id].filter((item) => item._id === action.payload._id)
      if (filter) {
        const oldData = [...state.Cart[state.selectClient._id]]
        const update = cartItemInArray(oldData, action.payload, add => {
          return updateObject(add, add.cartQnt = add.cartQnt + 1)
        })
        return {
          ...state,
          Cart: {
            ...state.Cart,
            [state.selectClient._id]: update
          },
          kot: {
            ...state.kot,
            [state.selectClient._id]: update
          }
        }
      } else {
        const oldData = [...state.Cart[state.selectClient._id]]
        const addQnt = Object.assign(action.payload, { cartQnt: 1 })
        oldData.push(addQnt)
        return {
          ...state,
          Cart: {
            ...state.Cart,
            [state.selectClient._id]: oldData
          },
          kot: {
            ...state.kot,
            [state.selectClient._id]: oldData
          }
        }
      }

    case ADD_FROM_CART:
      const old = [...state.Cart[state.selectClient._id]]
      const incrimentData = cartItemInArray(old, action.payload, incriment => {
        return updateObject(incriment, incriment.cartQnt = incriment.cartQnt + 1)
      })
      return {
        ...state,
        Cart: {
          ...state.Cart,
          [state.selectClient._id]: incrimentData
        },
        kot: {
          ...state.Cart,
          [state.selectClient._id]: incrimentData
        },
      }
    case REMOVE_FROM_CART:
      const oldRemove = [...state.Cart[state.selectClient._id]]
      const dicrimentData = cartItemInArray(oldRemove, action.payload, dicriment => {
        return updateObject(dicriment, dicriment.cartQnt = dicriment.cartQnt - 1)
      })
      return {
        ...state,
        Cart: {
          ...state.Cart,
          [state.selectClient._id]: dicrimentData
        },
        kot: {
          ...state.Cart,
          [state.selectClient._id]: dicrimentData
        }
      }
    case DELETE_FROM_CART:
      const oldDelete = [...state.Cart[state.selectClient._id]]
      oldDelete.pop(action.payload)
      return {
        ...state,
        Cart: {
          ...state.Cart,
          [state.selectClient._id]: oldDelete
        },
        kot: {
          ...state.Cart,
          [state.selectClient._id]: oldDelete
        }
      }
      case KOT_RESET:
        console.log(action.payload)
      return {
        ...state,
        kot: {
          ...state.kot,
          [action.payload]:[],
          kotPrinted:true
        }
      }
    default:
      return state
  }
}

export default Cart