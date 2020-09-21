import React, { useRef, Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles';
// import Controls from '../../../components/controls/Controls'
// import PrintIcon from '@material-ui/icons/Print';
import { Grid, Paper } from '@material-ui/core'

import Table from 'react-bootstrap/Table'
import './table.css'


const useStyles = makeStyles((theme) => ({
    PrintBody: props => {
        return {
            ...theme.GlobalBox,
            background: '#00000000',
            width: 840
        }
    },
    newButton: {
        position: 'absolute',
        right: '10px',
        bottom: '10px'
    },

}));


class PrintTable extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }
    render() {
        const { recordsAfterPagingAndSorting } = this.props
        return (
            <Grid container direction='column'>
                {recordsAfterPagingAndSorting().map((item) => (
                    <Grid container spacing={1} style={{
                        padding: 35, 
                        paddingTop: 5, 
                        // borderTop:  '1px solid #2a3446',
                        // borderBottom:'1px solid #2a3446',
                    }} key={item._id} >
                        <Grid item xs={12} sm={12} md={12}>
                            <Table bordered size="sm" className="mx-0 my-0">
                                <thead >
                                    <tr>
                                        <th>Recipt No</th>
                                        <th>Order Type</th>
                                        <th>Create By</th>
                                        <th>Payment Type</th>
                                        <th>Time</th>
                                        <th>Date</th>
                                        <th>Sub Total</th>
                                        <th>Tax </th>
                                        <th>Discount </th>
                                        <th>Complementary</th>
                                        <th>Total Amount</th>
                                        <th>Recive Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td  >{item.OrderSno}</td>

                                        <td  >{item.OrderType}</td>

                                        <td  >{item.createBy}</td>

                                        <td  >{item.paymentType}</td>

                                        <td  >{item.time}</td>

                                        <td>{item.date}</td>

                                        <td >{item.SubTotal}</td>

                                        <td>{item.taxAmount}</td>

                                        <td>{item.discount}</td>

                                        <td >
                                            <strong>{
                                                item.Complementary ?
                                                    <Icon color='green' name='checkmark' size='small' />
                                                    :
                                                    <Icon color='red' name='remove' size='small' />
                                            }</strong>
                                        </td>
                                        <td >
                                            <strong>{item.total}</strong>
                                        </td>
                                        <td >
                                            <strong>{item.reciveAmount}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Grid>
                        <Grid item xs={7} sm={7} md={7}  >
                            <Table bordered size="sm" className="mx-0 my-0" >
                                <thead >
                                    <tr>
                                        <th>{'Item'}</th>
                                        <th>Price</th>
                                        <th>Qnt</th>

                                        <th>total</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {item.products.map((prod) => (
                                        <tr key={prod._id}>
                                            <td>{prod.Name}</td>
                                            <td>{prod.Price}</td>
                                            <td>
                                                {prod.cartQnt}
                                            </td>
                                            <td>{prod.Price * prod.cartQnt}</td>
                                        </tr>

                                    ))}
                                </tbody>
                            </Table>
                        </Grid>
                    </Grid>
                ))}

            </Grid>
        )
    }
}

export default PrintTable