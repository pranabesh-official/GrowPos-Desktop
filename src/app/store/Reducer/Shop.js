import { READ_SHOP_DATA, GET_USER_DATA} from '../action/types'

const initialState = {
    logdin:false,
    shopAdd: false,
    ShopData: null,
    Name: null,
    Type: null,
    Contact: null,
    About: null,
    Location: null,
    Bar: null,
    _id:null,
    userData:null,
    ShopType: [
        { name: 'Resturant', id: 1 },
        { name: 'Shop', id: 2 },
    ],
}

const Shop = (state = initialState, action) => {

    switch (action.type) {
        case READ_SHOP_DATA:
            if (action.data.length === 1) {
                const [Shop] = action.data
                return {
                    ...state,
                    Name: Shop.Name,
                    Type: Shop.Type,
                    Contact: Shop.Contact,
                    About: Shop.About,
                    Location: Shop.Location,
                    Bar: Shop.Bar,
                    _id:Shop._id,
                    shopAdd: Shop.shopAdd,
                    ShopData: action.data
                }

            } else {
                return {
                    ...state,
                    ShopData: action.data
                }
            }
            case GET_USER_DATA:
            if (action.data.length === 1) {
                const [user] = action.data
                return {
                    ...state,
                    userData:user,
                    logdin:true,
                }
            } else {
                return {
                    ...state,
                    
                }
            }


        default: return state
    }

}
export default Shop