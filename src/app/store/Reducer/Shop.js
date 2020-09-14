import { READ_SHOP_DATA, GET_USER_DATA , GET_PRINTER_SETUP} from '../action/types'

const initialState = {
    logdin: false,
    shopAdd: false,
    ShopData: null,
    _id: null,
    userData: null,
    ShopType: [
        { name: 'Resturant', id: 1 , display:"Food And Drink" },
    ],
    printSetups: [],
    printers: false

}

const Shop = (state = initialState, action) => {

    switch (action.type) {
        case READ_SHOP_DATA:
            if (action.data.length === 1) {
                const [Shop] = action.data
                localStorage.setItem("ShopId", Shop._id)
                return {
                    ...state,
                    _id: Shop._id,
                    ShopData: Shop,
                    shopAdd: true,
                }

            } else if (action.data.length === 0) {
                return {
                    ...state,
                    shopAdd: false,
                    ShopData: {},
                }
            } else {
                const ShopId = localStorage.getItem("ShopId")
                const [existShop] = action.data.filter(item => item._id === ShopId)
                return {
                    ...state,
                    _id: existShop._id,
                    ShopData: existShop,
                    shopAdd: true,
                }
            }

        case GET_USER_DATA:
            if (action.data.length === 1) {
                const [user] = action.data
                return {
                    ...state,
                    userData: user,
                    logdin: true,
                }
            } else {
                return {
                    ...state,

                }
            }
        case GET_PRINTER_SETUP:
            return {
                ...state,
                printSetups: action.data,
                printers: true,
            }

        default: return state
    }

}
export default Shop