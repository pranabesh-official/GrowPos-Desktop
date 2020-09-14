import React, { Component } from 'react';
import { DataConsumer, DataContext } from '../../../../LocalDB'
import ClientButton from '../../../LayoutManeger/ClientButton'
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import { SelectClient } from '../../../../store/action/Cart'


class Tables extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.selectTable = this.selectTable.bind(this);

    }
    selectTable(table) {
        const { handleTabChange } = this.props.props
        handleTabChange(1, table)
        this.props.SelectClient(table)
    }

    render() {
        const { Tables } = this.context
        const { ActiveData } = this.props.Cart
        let sortItem = []
        if (this.props.Status) {
            const StatusShort = Tables.filter(item => item.table_Status === this.props.Status)
            sortItem = StatusShort.sort((a, b) => a.No - b.No)
        } else {
            sortItem = Tables.sort((a, b) => a.No - b.No)
        }
     
        const createAmount = (_id) => {
                const ActiveCart = ActiveData.find(item => item.ClientId === _id)
                let net =0
                let Tax =0
                if (ActiveCart) {
                    if (ActiveCart.Cart.length !== 0) {
                        
                        ActiveCart.Cart.forEach(element => {
                            net = net + element.cartQnt * element.Price
                            if (element.Tax_Include === false && element.Tax_Percent) {
                                Tax = Tax + ((element.cartQnt * element.Price) * element.Tax_Percent / 100)
                            }
                            
                        });
                        
                    }
                }
                return Number(net + Tax)
        }
        
        return (
            <DataConsumer>
                {() => (
                    sortItem.map((item) => (
                        <Grid item xs={3} sm={3} md={2} key={item._id}>

                            <ClientButton

                                onClick={() => this.selectTable(item)}
                                label={`TABLE ${item.No}`}
                                status={item.table_Status}
                                Type='Table'
                                size={110}
                                amount={createAmount(item._id) ? createAmount(item._id) : 0}
                                key={item._id}
                            />
                        </Grid>
                    ))
                )}
            </DataConsumer >
        )
    }
}
Tables.contextType = DataContext

const mapStateToProps = (state) => {
    return {
        Cart: state.Cart,
    }
}
export default connect(mapStateToProps, { SelectClient })(Tables);
