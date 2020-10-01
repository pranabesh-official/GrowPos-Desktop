import React, { createContext, Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import Controls from "../../components/controls/Controls";
import { withStyles } from '@material-ui/core/styles';
import { isElectron } from 'react-device-detect'
import axios from 'axios';
import PrintIcon from '@material-ui/icons/Print';




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
            subTitle: '',
            users: [],
            current: null
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.PrintPos = this.PrintPos.bind(this)
        this.dbUrl = 'http://localhost:4545';
        this.adduser = this.adduser.bind(this)
        this.token = sessionStorage.getItem("token")
        this.Authorization = `Bearer ${this.token}`
        this.editUser = this.editUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.loadAllusers = this.loadAllusers.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.chengeUserDetails = this.chengeUserDetails.bind(this);

    }
    componentDidMount() {
        if (this.token) {
            this.loadCurrentUser()
        }

    }
    handleClickOpen(title, subTitle) {
        this.setState({ open: true, title, subTitle })
    }

    handleClose() {
        this.setState({ open: false })
    }
    loadAllusers() {
        const config = {
            method: 'get',
            url: this.dbUrl + '/users',
            headers: {
                'Authorization': this.Authorization
            }
        };
        axios(config)
            .then(({ data: { users } }) => {
                this.setState({ users });
            })
            .catch((err) => console.log('Error:', err));
    }
    loadCurrentUser() {
        const config = {
            method: 'get',
            url: this.dbUrl + '/users/me',
            headers: {
                'Authorization': this.Authorization
            }
        };
        axios(config)
            .then(({ data }) => {
                this.setState({ current: data });
            })
            .catch((err) => console.log('Error:', err));
    }
    chengeUserDetails(data) {
        const config = {
            method: 'patch',
            url: this.dbUrl + '/users/me',
            headers: {
                'Authorization': this.Authorization
            },
            data: data
        };
        return new Promise((resolve, reject) => {
            axios(config)
                .then(({ data }) => {
                    this.setState({ current: data });
                    resolve()
                })
                .catch((err) => {
                    console.log('Error:', err)
                    reject(err)
                });
        })

    }
    adduser(data) {
        const config = {
            method: 'post',
            url: this.dbUrl + '/users',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.Authorization
            },
            data: data
        };
        return new Promise((resolve, reject) => {
            axios(config)
                .then(({ data: { user } }) => {
                    resolve(user)
                })
                .catch((err) => {
                    console.log('Error:', err)
                    reject(err)
                });

        })
    }
    editUser(id, data) {
        const config = {
            method: 'patch',
            url: this.dbUrl + '/users/' + id,
            headers: {
                'Authorization': this.Authorization,
                'Content-Type': 'application/json'
            },
            data: data
        };
        return new Promise((resolve, reject) => {
            axios(config)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch((err) => {
                    console.log('Error:', err)
                    reject(err)
                });

        })
    }
    deleteUser(id) {
        const config = {
            method: 'delete',
            url: this.dbUrl + '/users/' + id,
            headers: {
                'Authorization': this.Authorization,
                'Content-Type': 'application/json'
            },
        };
        return new Promise((resolve, reject) => {
            axios(config)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch((err) => {
                    console.log('Error:', err)
                    reject(err)
                });

        })
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
                    ...this.state,
                    ...this.props.Shop,
                    ...this.props.Cart,
                    deleteUser: this.deleteUser,
                    chengeUserDetails: this.chengeUserDetails,
                    editUser: this.editUser,
                    adduser: this.adduser,
                    loadAllusers: this.loadAllusers,
                    PrintPos: this.PrintPos,
                    handleClickOpen: this.handleClickOpen,
                }}
            >
                <>
                    {this.props.children}
                    <DialogBox />
                </>
            </Provider >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Cart: state.Cart,
        Shop: state.Shop,
        data: state.DataStore,
        Kot: state.Kot,
    }
}


export { Consumer as ShopData, context as ShopHandeler }

export default connect(mapStateToProps, )(withStyles(style, { withTheme: true })(ShopProvider))





