import React, { createContext, Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import Controls from "../../components/controls/Controls";
import { withStyles } from '@material-ui/core/styles';
import { isElectron } from 'react-device-detect'

import PrintIcon from '@material-ui/icons/Print';

// if (isElectron) {
//     // var { PosPrinter } = window.require('electron').remote.require("electron-pos-printer");


let context = null;
const { Provider, Consumer } = context = createContext()

const style = theme => ({
    dialog: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        textAlign: 'center'
    },
    dialogContent: {
        textAlign: 'center'
    },
    dialogAction: {
        justifyContent: 'center'
    },
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    }
});

class ShopProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            title: '',
            subTitle: ''
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.PrintPos = this.PrintPos.bind(this)

    }
    handleClickOpen(title, subTitle) {
        this.setState({ open: true, title, subTitle })
    }

    handleClose() {
        this.setState({ open: false })
    }

    PrintPos(data, Type) {
        if (isElectron) {
            const { ShopData } = this.props.Shop
            console.log(ShopData)
            var { PosPrinter } = window.require('electron').remote.require("electron-pos-printer");
            if (ShopData) {
                console.log(ShopData[Type])
                if (ShopData[Type]) {
                    const option = ShopData[Type]
                    const options = {
                        preview: option.preview,
                        width: '170px',
                        margin: '0 0 0 0',
                        copies: option.copies,
                        silent: option.silent,
                        printerName: option.printerName,
                        timeOutPerLine: option.timeOutPerLine
                    }
                    return new Promise((resolve, reject) => {
                        PosPrinter.print(data, options)
                            .then(() => {
                                resolve('secsess')
                            })
                            .catch((error) => {
                                reject(error)
                            });
                    })
                } else {
                    return new Promise((resolve, reject) => {
                        this.handleClickOpen(`${Type} Print Options Not Found`, 'Go to Setup And in Shop Set Options')
                        resolve()
                    })
                }
            } else {
                return new Promise((resolve, reject) => {
                    this.handleClickOpen(`Shop Have No Setup`, 'Go to Setup And in Shop Create Shop and Shop Set Options')
                    resolve()
                })
            }

        } else {
            return new Promise((resolve, reject) => {
                this.handleClickOpen('Print Setup Only Available On App', 'Download The app to Print Recipts! ')
                resolve()
            })
        }

    }

    render() {
        const DialogBox = () => {
            const { classes } = this.props;
            const titel = this.state.title
            const subTitle = this.state.subTitle
            const open = this.state.open
            return (
                <Dialog open={open} classes={{ paper: classes.dialog }}>
                    <DialogTitle className={classes.dialogTitle}>
                        <IconButton disableRipple className={classes.titleIcon}  >
                            <PrintIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        <Typography variant="h6">
                            {titel}
                        </Typography>
                        <Typography variant="subtitle2">
                            {subTitle}
                        </Typography>
                    </DialogContent>
                    <DialogActions className={classes.dialogAction}>
                        <Controls.Button
                            text="Close"
                            color='secondary'
                            onClick={this.handleClose} />
                    </DialogActions>
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
                    <DialogBox />
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

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(ShopProvider))





