import React, { Component } from 'react'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {add , remove, Delete} from '../../../store/action/Cart'
import CloseIcon from '@material-ui/icons/Close';
import './cart.css'



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
        const { Active } = this.props.Cart
        return (
            <Table bordered size="sm" className="mx-0 my-0" >
                <thead >
                    <tr>
                        <th><IconButton aria-label="delete" size="small" >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>

                        </th>
                        <th>{'item'}</th>
                        <th>Price</th>
                        <th>Qnt</th>
                        <th>total</th>
                    </tr>
                </thead>
                <tbody >
                    {Active.Cart.map((item, index) => (
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