import React, { Component } from 'react';
import Statusbutton from '../../LayoutManeger/StatusButton'
import { DataContext } from '../../../LocalDB'
import { connect } from 'react-redux'
import { SelectClient } from '../../../store/action/Cart'
import { OTLayout, BillLayout } from './PrintLayoyt'



class ActiveHandler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Active: {},
            isSave: false,
            buttonStutas: 'Inactive'
        }
        this.GenOTPrintLayout = this.GenOTPrintLayout.bind(this);
        this.SaveCart = this.SaveCart.bind(this);
        this.PrintBill = this.PrintBill.bind(this);
    }

    GenOTPrintLayout(Data) {
        const datetime = () => {
            const currentdate = new Date();
            const datetime = "DATE: " + currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " TIME "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
            return datetime
        }
        let tableBody = []
        Data.Ot.forEach(element => {
            tableBody.push({ Item: element.Name, Qnt: element.cartQnt, _id: element._id })
        });
        const PrintData = {
            header: 'KOT',
            DateTime: datetime(),
            subHeader: `${Data.Type} - ${Data.displayNo}`,
            barCode: `${Data.OTSno}-${Data.OTPrint}`,
            tableHeader: ['Item', 'Qnt'],
            tableBody: tableBody
        }
        return OTLayout(PrintData)
    }

    async SaveCart() {
        const { editItem } = this.context
        const { PrintPos } = this.props
        const { Active, } = this.props.Cart
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
                        PrintPos(PrintData, 'KOT').then(() => {
                            const UpdateOT = Object.assign(newActive, { Ot: [] })
                            editItem(newActive._id, UpdateOT).then(() => {

                            })
                            if (Active.Stutas !== "Active") {
                                editItem(Active.ClientId, { table_Status: 'Active' })
                            }
                            resolve()
                        })
                    }
                }).catch((error) => {
                    reject(error)
                });

            }
        })

    }
    PrintBill() {
        const { PrintPos } = this.props
        const { Active } = this.props.Cart
        const { ShopData } = this.props.Shop
        const { editItem } = this.context
        if (Active.Cart.length !== 0) {
            const datetime = () => {
                const currentdate = new Date();
                const datetime = "DATE: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth() + 1) + "/"
                    + currentdate.getFullYear() + " TIME "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();
                return datetime
            }
            let tableBody = []
            Active.Cart.forEach(element => {
                tableBody.push({ Item: element.Name, Qnt: element.cartQnt, _id: element._id, SubTotal: element.cartQnt * element.Price })
            });
            let clienId = `ORDER NO - ${Active.displayNo}`
            if (Active.Type === "Table") {
                clienId = `TABLE NO - ${Active.displayNo}`
            }
            let Tax =0
            let net = 0
            let Discount = 0
            Active.Cart.forEach(element => {
                net = net + element.cartQnt * element.Price
                if(element.Tax_Include === false && element.Tax_Percent ){
                    Tax = Tax + ((element.cartQnt * element.Price) * element.Tax_Percent / 100)
                }
            });
            const PrintData = {
                header: ShopData.Name.toUpperCase(),
                DateTime: datetime(),
                subHeader: "BILL",
                ClientID: clienId,
                barCode: `${Active.OTSno}`,
                Contact: {address:ShopData.Location ,contact:ShopData.Contact},
                tableHeader: ['Item', 'Qnt', 'SubTotal'],
                tableBody: tableBody,
                netAmount:net,
                tax:Tax,
                discount:Discount,
                total: net + Tax - Discount
            }
            const Bill = BillLayout(PrintData)
            if (Active.Ot.length === 0) {
                PrintPos(Bill, 'BILL').then(()=>{
                    if (Active.Stutas !== "Pending") {
                        editItem(Active.ClientId, { table_Status: 'Pending' })
                    }
                })
            } if (Active.Ot.length !== 0) {
                this.SaveCart().then(() => {
                    PrintPos(Bill, 'BILL')
                })
            }

        }

    }
    render() {
        const { Active } = this.props.Cart
        const { lodding, dataload } = this.props.data
        return (
            <>
                {Active.isActive ?
                    <Statusbutton
                        label='Save'
                        onClick={() => {
                            if (dataload) {
                                this.SaveCart()
                            }
                        }}
                        loading={lodding}
                        status={Active.Ot.length !== 0 ? 'Active' : 'Banned'}
                    />
                    :
                    <Statusbutton
                        label='Save'
                        onClick={() => {
                            if (dataload) {
                                this.SaveCart()
                            }
                        }}
                        loading={lodding}
                    />

                }

                <Statusbutton
                    label='Print Bill'
                    onClick={this.PrintBill}
                    status={"info"}

                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Cart: state.Cart,
        data: state.DataStore,
        Shop: state.Shop,
    }
}
ActiveHandler.contextType = DataContext

export default connect(mapStateToProps, { SelectClient })(ActiveHandler) 