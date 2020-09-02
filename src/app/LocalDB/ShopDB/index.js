import React, { createContext, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import AddShop from '../../views/Setup/Shop/ShopSetup/Addshop'
import DataProvider from '../index'
import { ThemeDark, danger } from '../../views/LayoutManeger/Themes'
import { withStyles } from '@material-ui/core/styles';

let context = null;
const { Provider, Consumer } = context = createContext()

const style = theme => ({
    // root: {
    //     borderRadius: 0,
    //     padding: '0 0px',
    //     width: '500px',
    //     
    //     margin: 0
    // },
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

class ShopProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)


    }
    componentDidMount() {

    }
    handleClickOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
    }



    render() {
        const DialogBox = () => {
            const { classes } = this.props;
            return (
                <Dialog open={this.state.open} onClose={this.handleClose} >
                    <MuiDialogTitle disableTypography className={classes.root}>
                        <IconButton aria-label="close" onClick={this.handleClose} size="small" className={classes.closeButton} >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    </MuiDialogTitle>
                    <MuiDialogContent dividers >
                        <DataProvider className={classes.content}>
                            <AddShop handleClose={this.handleClose} />
                        </DataProvider>
                    </MuiDialogContent>
                </Dialog>
            );
        };
        const { Tables } = this.props.data
        const TablesQnt = Tables.length
        return (
            <Provider
                value={{
                    ...this.props.Shop,
                    handleClickOpen: this.handleClickOpen,
                    Tables,
                    TablesQnt
                }}
            >
                <>
                    {this.props.children}
                    {DialogBox()}
                </>
            </Provider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Shop: state.Shop,
        data: state.DataStore,
    }
}


export { Consumer as ShopData, context as ShopHandeler }

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(ShopProvider))





