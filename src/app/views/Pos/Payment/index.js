import React, { useContext } from 'react';
import Statusbutton from '../../LayoutManeger/StatusButton'
import { DataContext } from '../../../LocalDB'
import { ClientHandeler } from '../../../LocalDB/ClientDB'
import {ShopHandeler} from '../../../LocalDB/ShopDB'
import { connect } from 'react-redux'


const ActionButton = () => {
    const { addItem , editItem , Tables } = useContext(DataContext) 
    const { PrintPos} = useContext(ShopHandeler) //PrintPos
    const { Cart, selectClient } = useContext(ClientHandeler)
    const selectCart = Cart[selectClient._id]
    const Data = { [selectClient._id]: selectCart }
    const [filter] = Tables.filter(item=> item._id === selectClient._id)


    const SaveCart = () => {
        addItem('Cart', Data).then((data) => {
            PrintPos({client:selectClient, Data:selectCart }, 'KOT')
            if(filter.table_Status === "Inactive"){
                editItem(selectClient._id , {table_Status:'Active'})
            }
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

const mapStateToProps = (state) => {
    return {
        Kot: state.Kot,
    }
}
export default connect(mapStateToProps)(ActionButton) 