import React, {useContext} from 'react';
import { connect } from 'react-redux'
import ActiveHandler from './Active'
// import { ClientHandeler } from '../../../LocalDB/ClientDB'
import { ShopHandeler } from '../../../LocalDB/ShopDB'

const ActionButton = () => {
    const { PrintPos } = useContext(ShopHandeler) //PrintPos
    // const { Active } = useContext(ClientHandeler)
    return (
        <div>
           <ActiveHandler PrintPos={PrintPos} />
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        Kot: state.Kot,
    }
}
export default connect(mapStateToProps)(ActionButton) 