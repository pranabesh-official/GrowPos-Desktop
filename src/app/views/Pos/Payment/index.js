import React, { useContext } from 'react';
import { connect } from 'react-redux'
import { ClientHandeler } from '../../../LocalDB/ClientDB'
import { ShopHandeler } from '../../../LocalDB/ShopDB'
import { Grid } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import Statusbutton from '../../../components/StatusButton'
import BillHandler from './BillHandler'

const ActionButton = (props) => {
    const { PrintPos } = useContext(ShopHandeler) //PrintPos
    const { getBilldetails } = useContext(ClientHandeler)
    const { Active } = props.Cart
    const createAmount = () => {
        let net = 0
        let Tax = 0
        if (Active.Cart.length !== 0) {
            Active.Cart.forEach(element => {
                net = net + element.cartQnt * element.Price
                if (element.Tax_Include === false && element.Tax_Percent) {
                    Tax = Tax + ((element.cartQnt * element.Price) * element.Tax_Percent / 100)
                }
            });

        }
        const amount = Number(net + Tax)
        return amount.toFixed(2)
    }

    return (
        <Grid container >
            <BillHandler PrintPos={PrintPos} getBilldetails={getBilldetails} />
            <Grid item xs={4}>
                < Statusbutton
                    label='Sattelment'
                    status={"info"}
                    Sublabel={`AMOUNT ${createAmount()}`}
                    src={<PaymentIcon />}
                />

            </Grid>
        </Grid>

    )

}
const mapStateToProps = (state) => {
    return {
        Kot: state.Kot,
        Cart: state.Cart,
    }
}
export default connect(mapStateToProps)(ActionButton) 