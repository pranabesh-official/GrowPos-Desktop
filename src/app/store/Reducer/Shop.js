import { READ_SHOP_DATA } from '../action/types'

const initialState = {
    ShopData: null,
    _id: null,
    ShopType: [
        { name: 'Resturant', _id: 1, display: "Food And Drink" },
    ],
}

const Shop = (state = initialState, action) => {

    switch (action.type) {
        case READ_SHOP_DATA:
            console.log(action.data)
            return {
                ...state,
                ShopData: action.data,
                _id: action.data._id
            }


        default: return state
    }

}
export default Shop