import React, { Component } from 'react';
import Statusbutton from '../../../components/StatusButton'
import { DataContext } from '../../../LocalDB'
import { connect } from 'react-redux'
import { OTLayout, BillLayout } from './PrintLayoyt'
import { Grid } from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SaveIcon from '@material-ui/icons/Save';
import {insert} from '../../../Utils/OrderTickets'
import { datetime, date, time } from '../../../Utils'
import { StoreKot, ClearKot } from '../../../store/action/Kot'

class BillHandler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Active: {},
            isSave: false,
            buttonStutas: 'Inactive',
            Billing: false,
            Save: false
        }
        this.GenOTPrintLayout = this.GenOTPrintLayout.bind(this);
        this.SaveCart = this.SaveCart.bind(this);
        this.printBill = this.printBill.bind(this);
        this.Bill = this.Bill.bind(this);
        this.genBill = this.genBill.bind(this);
        this.printOT = this.printOT.bind(this);
    }

    GenOTPrintLayout(Data) {
        let tableBody = []
        Data.Ot.forEach(element => {
            tableBody.push({ Item: element.Name, Qnt: element.PrintQnt, _id: element._id })
        });
        const PrintData = {
            header: 'Order Tiket',
            DateTime: datetime(),
            subHeader: `${Data.Type} - ${Data.displayNo}`,
            barCode: `${Data.OTSno}-${Data.OTPrint}`,
            tableHeader: ['Item', 'Qnt'],
            tableBody: tableBody
        }
        return OTLayout(PrintData)
    }
    printOT(PrintData) {
        const { PrintPos } = this.props
        const { ShopData } = this.props.Shop
        if (ShopData) {
            if (ShopData.OT) {
                if (ShopData.OT.print) {
                    PrintPos(PrintData, 'OT')
                }
            }
        }
    }
    SaveCart() {
        const { editItem } = this.context
        const { Active } = this.props.Cart
        const generator = require('generate-serial-number')
        return new Promise((resolve, reject) => {
            if (Active.Cart.length !== 0) {
                const newActive = Object.assign(Active, {
                    Cart: Active.Cart,
                    OTPrint: Active.OTPrint + 1,
                    Ot: Active.Ot,
                    Stutas: Active.Stutas,
                    isActive: true,
                    OTSno: Active.OTSno || generator.generate(10)
                })
                editItem(Active._id, newActive).then(() => {
                    const PrintData = this.GenOTPrintLayout(newActive)
                    if (Active.Ot.length !== 0) {
                        this.setState({ Save: true })
                        console.log(Active.Ot)
                        this.props.StoreKot(Active._id, `${newActive.OTSno}-${newActive.OTPrint}`, Active.Ot, date(), time())
                        insert({
                            TicketId:Active._id,
                            displayId: `${newActive.OTSno}-${newActive.OTPrint}`,
                            TicketData:Active.Ot,
                            date:date(),
                            time:time()
                        })
                        const UpdateOT = Object.assign(newActive, { Ot: [] })
                        if (Active.Stutas === "Inactive") {
                            editItem(Active.ClientId, { table_Status: 'Active' })
                            editItem(newActive._id, UpdateOT).then(() => {
                                this.setState({ Save: false })
                                this.printOT(PrintData)
                                resolve()
                            })
                        } else {
                            editItem(newActive._id, UpdateOT).then(() => {
                                this.setState({ Save: false })
                                this.printOT(PrintData)
                                resolve()
                            })
                        }
                    }
                }).catch((error) => {
                    reject(error)
                    this.setState({ loading: false })
                });

            }
        })

    }
    printBill(Bill) {
        const { PrintPos } = this.props
        const { ShopData } = this.props.Shop
        if (ShopData) {
            if (ShopData.Bill) {
                if (ShopData.Bill.print) {
                    PrintPos(Bill, 'Bill')
                }
            }
        }
    }
    genBill() {
        const { Active } = this.props.Cart
        const { ShopData } = this.props.Shop
        let tableBody = []
        Active.Cart.forEach(element => {
            tableBody.push({ Item: element.Name, Qnt: element.cartQnt, _id: element._id, SubTotal: element.cartQnt * element.Price })
        });
        let clienId = `ORDER NO - ${Active.displayNo}`
        if (Active.Type === "Table") {
            clienId = `TABLE NO - ${Active.displayNo}`
        }

        let Tax = 0
        let net = 0
        let Dis = 0
        Active.Cart.forEach(element => {
            net = net + element.cartQnt * element.Price
            if (element.withTax === false && element.Tax_Percent) {
                Tax = Tax + ((element.cartQnt * element.Price) * element.Tax_Percent / 100)
            }
        });

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
        const PrintData = {
            header: ShopData.Name.toUpperCase(),
            DateTime: datetime(),
            subHeader: "BILL",
            ClientID: clienId,
            barCode: `${Active.OTSno}`,
            Contact: { address: ShopData.Location, contact: ShopData.Contact },
            tableHeader: ['Item', 'Qnt', 'SubTotal'],
            tableBody: tableBody,
            netAmount: Number(net),
            tax: Number(Tax),
            discount: Number(Dis),
            total: Number(net + Tax - Dis),
            complementary: Active.free || false
        }
        const Bill = BillLayout(PrintData)
        return Bill
    }
    Bill() {
        const { Active } = this.props.Cart
        const { editItem } = this.context
        if (Active.Cart.length !== 0) {
            if (Active.Ot.length === 0) {
                this.setState({ Billing: true })
                const Bill = this.genBill()
                if (Active.Stutas === "Active" || Active.Stutas === "Inactive") {
                    editItem(Active.ClientId, { table_Status: 'Pending' }).then(() => {
                        this.printBill(Bill)
                    })
                    this.setState({ Billing: false })
                } else {
                    this.printBill(Bill)
                    this.setState({ Billing: false })
                }
            } if (Active.Ot.length !== 0) {
                this.setState({ Billing: true })
                this.SaveCart().then(() => {
                    const Bill = this.genBill()
                    if (Active.Stutas === "Active" || Active.Stutas === "Inactive") {
                        editItem(Active.ClientId, { table_Status: 'Pending' }).then(() => {
                            this.printBill(Bill)
                        })
                        this.setState({ Billing: false })
                    } else {
                        this.printBill(Bill)
                        this.setState({ Billing: false })
                    }
                })
            }

        }
    }


    render() {
        const { Active } = this.props.Cart
        return (
            <>
                <Grid item xs={4}>
                    <Statusbutton
                        label='SAVE'
                        onClick={() => {
                            if (this.state.Save === false && this.state.Billing === false ) {
                                this.SaveCart()
                            }
                        }}
                        status={this.state.Save ?"Active":"Inactive"}
                        Sublabel={`SAVE NO - ${Active.OTPrint}`}
                        src={<SaveIcon />}
                        loading={this.state.Save}
                    />
                </Grid>
                <Grid item xs={4}>
                    < Statusbutton
                        label='BILL'
                        onClick={() => {
                            if (this.state.Billing === false && this.state.Save === false ) {
                                this.Bill()
                            }
                        }}
                        status={this.state.Billing ?"Active":"Inactive"}
                        Sublabel={`CART ITEM - ${Active.Cart.length}`}
                        src={<ReceiptIcon />}
                        loading={this.state.Billing}
                    />

                </Grid>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Cart: state.Cart,
        data: state.DataStore,
        Shop: state.Shop,
        kot: state.Kot
    }
}
BillHandler.contextType = DataContext

export default connect(mapStateToProps, { StoreKot, ClearKot })(BillHandler) 