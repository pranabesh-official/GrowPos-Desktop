import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { ClientHandeler } from '../../../LocalDB/ClientDB'
import { ShopHandeler } from '../../../LocalDB/ShopDB'
import { Grid } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';
import Statusbutton from '../../../components/StatusButton'
import BillHandler from './BillHandler'
import Popup from '../../../components/Popup'
import Settlement from './Payment'
import { getAll , Delete } from '../../../Utils/OrderTickets'

const ActionButton = (props) => {
    const initialFValues = {
        SubTotal: 0,
        taxAmount: 0,
        discount: 0,
        total: 0
    }
    const { PrintPos } = useContext(ShopHandeler) //PrintPos
    const { getBilldetails } = useContext(ClientHandeler)
    const [openPopup, setOpenPopup] = useState(false)
    const { Active } = props.Cart
    const [BillData, setBillData] = useState(initialFValues)

    useEffect(() => {
        let net = 0
        let Tax = 0
        let Dis = 0
        if (Active.Cart.length !== 0) {
            Active.Cart.forEach(element => {
                net = net + element.cartQnt * element.Price
                if (element.withTax === false && element.Tax_Percent) {
                    Tax = Tax + ((element.cartQnt * element.Price) * element.Tax_Percent / 100)
                }
            });
        }

        if (Active.discount) {
            if (Active.discount === true) {
                if (Active.Discount) {
                    Dis = Active.Discount
                }
                if (Active.Percent) {
                    Dis = (Tax + net) * Active.Discount / 100
                }
            }
        }
        const amount = Number(net + Tax - Dis)
        setBillData({
            SubTotal: Number(net),
            taxAmount: Number(Tax),
            discount: Number(Dis),
            total: amount
        })
    }, [Active.Cart, Active.discount, Active.Discount, Active.Percent])
    const { handleTabChange } = props
    const SaveTickets = getAll().filter(item => item.TicketId === Active._id)

    return (
        <Grid container >
            <BillHandler PrintPos={PrintPos} getBilldetails={getBilldetails} />
            <Grid item xs={4}>
                < Statusbutton
                    label='PAYMENT'
                    Sublabel={`TOTAL - ${BillData.total.toFixed(2)}`}
                    src={<PaymentIcon />}
                    loading={openPopup}
                    status={openPopup ? "Active" : "Inactive"}
                    onClick={() => {
                        if (Active.Cart.length !== 0 && Active.isActive) {
                            setOpenPopup(true)
                        }

                    }}
                />

            </Grid>
            <Popup
                // title={"Tax"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <Settlement
                    BillData={BillData}
                    Active={Active}
                    setOpenPopup={setOpenPopup}
                    handleTabChange={handleTabChange}
                    SaveTickets={SaveTickets}
                    Delete={Delete}
                />
            </Popup>
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