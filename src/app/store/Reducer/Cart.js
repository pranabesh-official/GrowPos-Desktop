import { SELECT_CLIENT, ADD_TO_CART, DELETE_FROM_CART, REMOVE_FROM_CART, ADD_FROM_CART, GET_CART_DATA, RESET_OT, GET_ACTIVE } from '../action/types'

const initialState = {
  Cart: {},
  createCart: false,
  selectClient: null,
  getData: false,
  kot: {},
  kotPrinted: false,
  Clients: [],
  ActiveData: [],
  Active: {
    Cart: [],
    Ot: [],
    ClientId: null,
    displayNo: null,
    Stutas: null,
    OTPrint: 0,
    OTSno: null,
    BillSno: null,
    isActive: false,
    Type: null
  }
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
const addNew = (arry, product) => {
  const AddNew = [...arry]
  const AddProduct = Object.assign(product, { cartQnt: 1 })
  AddNew.push(AddProduct)
  return AddNew
}
const IsExist = (arry, product) => {
  const find = arry.find(item => item._id === product._id)
  if (find) {
    return true
  } else {
    return false
  }
}
const CheakActive = (array, id) => {
  const find = array.find(item => item.ClientId === id)
  if (find) {
    return true
  } else {
    return false
  }
}
const Cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_DATA:
      return {
        ...state,
        Clients: action.payload
      }
    case GET_ACTIVE:
      return {
        ...state,
        ActiveData: action.payload
      }
    case SELECT_CLIENT:
      const client = action.payload
      const find = state.Clients.find(item => item._id === client._id)
      const Status = CheakActive(state.ActiveData, find._id)
      if (Status) {
        const ActiveData = state.ActiveData.find(item => item.ClientId === find._id)
      
        return {
          ...state,
          selectClient: find,
          Active: {
            ...state.Active,
            Cart: ActiveData.Cart,
            Ot: ActiveData.Ot,
            ClientId: find._id,
            Stutas: find.table_Status,
            _id: ActiveData._id,
            displayNo: find.No,
            isActive: ActiveData.isActive || false,
            OTPrint: ActiveData.OTPrint,
            OTSno: ActiveData.OTSno,
            Type: 'Table'
          }
        }
      } else {
        
        return {
          ...state,
          selectClient: find,
          Active: {
            ...state.Active,
            Cart: [],
            Ot: [],
            ClientId: find._id,
            Stutas: find.table_Status,
            isActive: false,
            displayNo: find.No,
            Type: 'Table'
          }
        }
      }

    case ADD_TO_CART:
      const ProductExist = IsExist(state.Active.Cart, action.payload)
      if (ProductExist) {
        const kotExist = IsExist(state.Active.Ot, action.payload)
        const OldCart = [...state.Active.Cart]
        const updatedCart = cartItemInArray(OldCart, action.payload, add => {
          return updateObject(add, add.cartQnt = add.cartQnt + 1)
        })
        if (kotExist) {
          const OldOt = [...state.Active.Ot]
          const updatedOt = cartItemInArray(OldOt, action.payload, add => {
            return updateObject(add, add.cartQnt = add.cartQnt + 1)
          })
          return {
            ...state,
            Active: {
              ...state.Active,
              Cart: updatedCart,
              Ot: updatedOt,
            }
          }
        } else {
          const newOt = addNew(state.Active.Ot, action.payload)
          return {
            ...state,
            Active: {
              ...state.Active,
              Cart: updatedCart,
              Ot: newOt,
            }
          }
        }
      } else {
        const newdata = addNew(state.Active.Cart, action.payload)
        const newOt = addNew(state.Active.Ot, action.payload)
        return {
          ...state,
          Active: {
            ...state.Active,
            Cart: newdata,
            Ot: newOt,
          }
        }
      }

    case ADD_FROM_CART:
      const kotExist = IsExist(state.Active.Ot, action.payload)
      const OldCart = [...state.Active.Cart]
      const updatedCart = cartItemInArray(OldCart, action.payload, add => {
        return updateObject(add, add.cartQnt = add.cartQnt + 1)
      })
      if (kotExist) {
        const OldOt = [...state.Active.Ot]
        const updatedOt = cartItemInArray(OldOt, action.payload, add => {
          return updateObject(add, add.cartQnt = add.cartQnt + 1)
        })
        return {
          ...state,
          Active: {
            ...state.Active,
            Cart: updatedCart,
            Ot: updatedOt,
          }
        }
      } else {
        const newOt = addNew(state.Active.Ot, action.payload)
        return {
          ...state,
          Active: {
            ...state.Active,
            Cart: updatedCart,
            Ot: newOt,
          }
        }
      }
    case REMOVE_FROM_CART:
      const OtExist = IsExist(state.Active.Ot, action.payload)
      const OldCartData = [...state.Active.Cart]
      const updatedCartdata = cartItemInArray(OldCartData, action.payload, add => {
        return updateObject(add, add.cartQnt = add.cartQnt - 1)
      })
      if (OtExist) {
        const OldOt = [...state.Active.Ot]
        const updatedOt = cartItemInArray(OldOt, action.payload, add => {
          return updateObject(add, add.cartQnt = add.cartQnt - 1)
        })
        return {
          ...state,
          Active: {
            ...state.Active,
            Cart: updatedCartdata,
            Ot: updatedOt,
          }
        }
      } else {
        return {
          ...state,
          Active: {
            ...state.Active,
            Cart: updatedCartdata,
          }
        }
      }
    case DELETE_FROM_CART:
      const Exist = IsExist(state.Active.Ot, action.payload)
      const OldCartDelete = [...state.Active.Cart]
      OldCartDelete.pop(action.payload)
      if (Exist) {
        const OldoldDelete = [...state.Active.Ot]
        OldoldDelete.pop(action.payload)
        return {
          ...state,
          Active: {
            ...state.Active,
            Cart: OldCartDelete,
            Ot: OldoldDelete,
          }
        }
      } else {
        return {
          ...state,
          Active: {
            ...state.Active,
            Cart: OldCartDelete,
          }
        }
      }

    case RESET_OT:
      const ActiveData = state.ActiveData.find(item => item.ClientId === state.selectClient._id)
        return {
          ...state,
          Active: {
            ...state.Active,
            Cart: ActiveData.Cart,
            Ot: ActiveData.Ot,
            ClientId: ActiveData._id,
            Stutas: ActiveData.table_Status,
            _id: ActiveData._id,
            displayNo: ActiveData.No,
            isActive: true,
            OTPrint: ActiveData.OTPrint,
            OTSno: ActiveData.OTSno,
            Type: 'Table'
          }
        }
    default:
      return state
  }
}

export default Cart