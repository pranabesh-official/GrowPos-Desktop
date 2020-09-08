import React, { useContext } from 'react';
import Statusbutton from '../../LayoutManeger/StatusButton'
import { DataContext } from '../../../LocalDB'
import { ClientHandeler } from '../../../LocalDB/ClientDB'
import {ShopHandeler} from '../../../LocalDB/ShopDB'



const ActionButton = () => {
    const { addItem , editItem} = useContext(DataContext)
    const {PrintPos} = useContext(ShopHandeler)
    const { Cart, selectClient } = useContext(ClientHandeler)
    const selectCart = Cart[selectClient._id]
    const Data = { [selectClient._id]: selectCart }
    
    const SaveCart = () => {
        addItem('Cart', Data).then((data) => {
            PrintPos({Sno:selectClient.No, Data:selectCart , Type:selectClient.dbName}, 'KOT')
            editItem(selectClient._id , {table_Status:'Active'})
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div>
            <Statusbutton
                label='Print Kot'
                onClick={() => SaveCart()}
            />
            <Statusbutton
                label='Print Bill'
            />
            <Statusbutton
                label='Sattelment'
            // onClick={}
            />
        </div>
    )

}

export default ActionButton;