import React, { createContext, Component } from 'react';
import { connect } from 'react-redux'
import { ThemeDark, danger } from '../../views/LayoutManeger/Themes'
import { withStyles } from '@material-ui/core/styles';
import { addToCart } from '../../store/action/Cart'
let context = null;
const { Provider, Consumer } = context = createContext()

const style = theme => ({

    root: {
        margin: 0,
        padding: theme.spacing(2),
        height: '18px',
        background: ThemeDark
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: danger,
        background: ThemeDark
    },
    content: {
        padding: 2,
    }
});

class ClientProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Current: null,
            Mobile:'',
            Name: '',
            serch:'',
            Discount:'',
            free:false , 
            discount:false,
            Percent:true
        }
        this.billDetails = this.billDetails.bind(this);
        this.addCart = this.addCart.bind(this);
    }
    componentDidMount() {

    }
    billDetails(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    addCart(item){
        this.props.addToCart(item)
    }
    Search(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }



    render() {
      
        return (
            <Provider
                value={{
                    ...this.state,
                    ...this.props.Cart,
                    billDetails: this.billDetails,
                    addCart : this.addCart,
                }}
            >
                <>
                    {this.props.children}

                </>
            </Provider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.DataStore,
        Cart :state.Cart,
    }
}


export { Consumer as ClientData, context as ClientHandeler }

export default connect(mapStateToProps, {addToCart})(withStyles(style, { withTheme: true })(ClientProvider))





