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
import { PrintLayout } from '../../Utils/PrintLayout'

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
        this.genKot = this.genKot.bind(this)
        this.kotHandler = this.kotHandler.bind(this)
    }
    handleClickOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
    }
    genKot(Data) {
        const generator = require('generate-serial-number');
        const { Print, Kot } = this.props.Kot
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
        
        if (Print === false) {
            let tableBody = []
            Data.Data.forEach(element => {
                tableBody.push({ Item: element.Name, Qnt: element.cartQnt, _id: element._id })
            });
            const PrintData = {
                header: 'KOT',
                DateTime:datetime(),
                subHeader: `${Data.client.dbName} No ${Data.client.No}`,
                barCode: generator.generate(10),
                tableHeader: ['Item', 'Qnt'],
                tableBody: tableBody
            }
            this.props.GetKot(tableBody, Data.client._id)
            return PrintLayout(PrintData)
        } else {
            let tableBody = []
            Data.Data.forEach(element => {
                tableBody.push({ Item: element.Name, Qnt: element.cartQnt, _id: element._id })
            });
            Kot[Data.client._id].forEach((OldItem) => {
                const existItem = tableBody.find(item => item.Item === OldItem.Item)
                if (existItem) {
                    tableBody.pop(existItem)
                    const newQnt = existItem.Qnt - OldItem.Qnt
                    if (newQnt !== 0 && newQnt > 0) {
                        const NewItem = Object.assign(existItem, { Qnt: newQnt })
                        tableBody.push(NewItem)
                    }
                }
            })
            const PrintData = {
                header: 'KOT',
                DateTime:datetime(),
                subHeader: `${Data.client.dbName} No ${Data.client.No}`,
                barCode: generator.generate(10),
                tableHeader: ['Item', 'Qnt'],
                tableBody: tableBody
            }
            this.props.GetKot(tableBody, Data.client._id)
            return PrintLayout(PrintData)
        }
    }
    kotHandler(Data, Table) {
        const send = () => {
            return new Promise((resolve, reject) => {
                try {

                    resolve('done')
                } catch (error) {
                    reject(error)
                }
            })
        }
        return new Promise((resolve, reject) => {
            send().then((r) => {
                const { Kot } = this.props.Kot
                resolve(Kot)
            }).catch((err) => {
                reject(err)
            });
        })
    }

    PrintPos(data, Type) {
        const setData = (Type) => {
            switch (Type) {
                case 'KOT': return this.genKot(data)
                case 'BILL': return data
                default: return data
            }
        }
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
                        // printerName: '', 
                        timeOutPerLine: 400

                    }
            }
        }
        return new Promise((resolve, reject) => {
            PosPrinter.print(setData(Type), setOption(Type))
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
                    genKot: this.genKot,
                    PrintPos: this.PrintPos,
                    kotHandler: this.kotHandler,
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





