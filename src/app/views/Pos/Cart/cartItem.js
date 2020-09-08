import React, { Component } from 'react'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {add , remove, Delete} from '../../../store/action/Cart'
class CartItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tableId: '',
            cartItem: []
        }
        this.handleremove = this.handleremove.bind(this);
    }
    handleremove = (item) => {
        if (item.cartQnt >= 2) { 
            this.props.remove(item)
        }
    }

    componentDidMount() {

    }
    componentWillReceiveProps() {

    }
    render() {
        const { Cart } = this.props.Cart
        const CartItems = Cart[this.props.id]
        return (
            <Table bordered size="sm" className="mx-0 my-0" style={{boxShadow: '0 0px 0px 0px '}}>
                <thead style={{boxShadow: '0 0px 0px 0px '}}>
                    <tr>
                        <th><IconButton aria-label="delete" size="small" >
                            <ShoppingCartIcon fontSize="inherit" />
                        </IconButton>

                        </th>
                        <th>{'item'}</th>
                        <th>Price</th>
                        <th>Qnt</th>
                        <th>total</th>
                    </tr>
                </thead>
                <tbody style={{boxShadow: '0 0px 0px 0px '}}>
                    {CartItems.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <IconButton aria-label="delete" color="secondary" size="small" onClick={() =>this.props.Delete(item)}>
                                    <DeleteForeverIcon fontSize="inherit" />
                                </IconButton>
                            </td>
                            <td>{item.Name}</td>
                            <td>{item.Price}</td>
                            <td>
                                <IconButton aria-label="add" color="primary" size="small" onClick={() => this.props.add(item)} >
                                    <AddCircleIcon fontSize="inherit" />
                                </IconButton>
                                {item.cartQnt}
                                <IconButton aria-label="remove" color="secondary" size="small" onClick={() => this.handleremove(item)} >
                                    <RemoveCircleIcon fontSize="inherit" />
                                </IconButton>
                            </td>
                            <td>{item.Price * item.cartQnt}</td>

                        </tr>

                    ))}
                </tbody>
            </Table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.DataStore,
        Cart: state.Cart,
    }
}

export default connect(mapStateToProps, {add , remove , Delete })(CartItem)