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
import { isElectron } from 'react-device-detect'
import { GetKot } from '../../store/action/Kot'


if (isElectron) {
    var { PosPrinter } = window.require('electron').remote.require("electron-pos-printer");
}

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
        padding: 0,
        margin: 0
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
        this.PrintPos = this.PrintPos.bind(this)

    }
    handleClickOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
    } 

    PrintPos(data, Type) {
        const setOption = (Type) => {
            const { printSetups } = this.props.Shop
            const [filter] = printSetups.filter(item => item.Name === Type)
            switch (Type) {
                case 'KOT':
                    return {
                        preview: filter.preview,
                        silent: filter.silent,
                        width: '170px',
                        margin: '0 0 0 0',
                        copies: filter.copies,
                        printerName: filter.printerName,
                        timeOutPerLine: filter.timeOutPerLine
                    }
                case 'BILL':
                    return {
                        preview: filter.preview,
                        silent: filter.silent,
                        width: '170px',
                        margin: '0 0 0 0',
                        copies: filter.copies,
                        printerName: filter.printerName,
                        timeOutPerLine: filter.timeOutPerLine
                    }
                default:
                    return {
                        preview: false,
                        width: '170px',
                        margin: '0 0 0 0',
                        copies: 1,
                        silent:true,
                        timeOutPerLine: 400
                    }
            }
        }
        return new Promise((resolve, reject) => {
            PosPrinter.print(data, setOption(Type))
                .then(() => {
                    resolve('secsess')
                })
                .catch((error) => {
                    reject(error)
                });
        })
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
                    <MuiDialogContent dividers className={classes.content}>
                        <DataProvider >
                            <AddShop handleClose={this.handleClose} />
                        </DataProvider>
                    </MuiDialogContent>
                </Dialog>
            );
        };

        return (
            <Provider
                value={{
                    ...this.props.Shop,
                    PrintPos: this.PrintPos,
                    handleClickOpen: this.handleClickOpen,
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
        Kot: state.Kot,
    }
}


export { Consumer as ShopData, context as ShopHandeler }

export default connect(mapStateToProps, { GetKot })(withStyles(style, { withTheme: true })(ShopProvider))





