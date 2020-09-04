import React, { Component } from 'react'
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';


const mapStateToProps = (state) => {
    return {
        cartItem: state.cartitem
    }
}
class CartItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tableId: '',
            cartItem: []
        }
        this.handleremove = this.handleremove.bind(this);
    }
    handleremove = (qnt, id) => {
        if (qnt >= 2) {  }
    }

    componentDidMount() {

    }
    componentWillReceiveProps() {

    }
    render() {

        return (
            <Table striped bordered hover size="sm" className="mx-0 my-0">
                <thead>
                    <tr>
                        <th><IconButton aria-label="delete" color="secondary" size="small" >
                            <ShoppingCartIcon fontSize="inherit" />
                        </IconButton>

                        </th>
                        <th>{'          item'}</th>
                        <th>Price</th>
                        <th>Qnt</th>
                        <th>total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <IconButton aria-label="delete" color="secondary" size="small" onClick={() => this.props.Delete('name')}>
                                <DeleteForeverIcon fontSize="inherit" />
                            </IconButton>
                        </td>
                        <td>{'name'}</td>
                        <td>{'price'}</td>
                        <td>
                            <IconButton aria-label="add" color="primary" size="small" onClick={() => this.props.add('name')} >
                                <AddCircleIcon fontSize="inherit" />
                            </IconButton>
                            {'qnt'}
                            <IconButton aria-label="remove" color="secondary" size="small" onClick={() => this.handleremove('qnt', 'name')} >
                                <RemoveCircleIcon fontSize="inherit" />
                            </IconButton>
                        </td>
                        <td>{'price qnt'}</td>

                    </tr>
                </tbody>
            </Table>
        )
    }
}



export default connect(mapStateToProps)(CartItem)