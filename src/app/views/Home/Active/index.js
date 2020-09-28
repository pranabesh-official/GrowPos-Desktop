import React, { useState, useEffect, useContext } from 'react';//useContext
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TableBody, TableRow, TableCell, InputAdornment } from '@material-ui/core';//InputAdornment
import useTable from '../../../components/Datatable'
// import AddIcon from '@material-ui/icons/Add';
import { Search } from "@material-ui/icons";
import Controls from '../../../components/controls/Controls'
import Popup from '../../../components/Popup'
// import { ShopHandeler } from '../../../LocalDB/ShopDB'
import { connect } from 'react-redux'
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import Info from '../../../components/infoPage'
import DeleteIcon from '@material-ui/icons/Delete';
import { DataContext } from '../../../LocalDB'


const useStyles = makeStyles((theme) => ({
    Header: props => {
        return {
            ...theme.GlobalBox,
            border: 0,
            padding: 8,
            height: `${48}px`,
            // width: '100%',
            // borderBottom: '1px solid #f0f0f0'
        }
    },
    Body: props => {
        return {
            ...theme.GlobalBox,
            overflow: 'auto',
            height: `${(props.height - 240) - 100}px`,

        }
    },
    Footer: props => {
        return {
            ...theme.GlobalBox,
            padding: 0,
            // width: '100%',
            height: `${52}px`,
            borderTop: '1px solid #f0f0f0'
        }
    },
    searchInput: {
        margin: '4px',
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    resize: {
        height: 27,
        fontSize: 11,
        padding: '0 0px 0px 0px '
    },
    CellContentent: {
        textAlign: 'center',
        justifyContent: 'center'
    }
}));

const headCells = [
    { _id: 'Type', label: 'Active' },  
    { _id: 'OTSno', label: 'Recipt No' },
    { _id: 'Stutas', label: 'Stutas', },
    { _id: 'Type', label: 'Type' },
    { _id: 'Amount', label: 'Amount', },
    { _id: 'actions', label: 'Clear', disableSorting: true }
]

const Active = (props) => {
    const { addItem, editItem, deleteItem } = useContext(DataContext)
    const { ActiveData, Clients } = props.Cart
    const [records, setRecords] = useState(ActiveData)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const classes = useStyles(props);
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.OTSno && x.OTSno.toLowerCase().includes(target.value))
            }
        })
    }

    useEffect(() => {
        setRecords(ActiveData)
    }, [ActiveData])

    const getStatus = (id) => {
        const status = Clients.find(item => item._id === id)
        if (status) {
            return status.table_Status
        } else {
            return "Removed"
        }

    }
    const getAmount = (Active) => {
        let net = 0
        let Tax = 0
        let Dis = 0
        if (Active.Cart.length !== 0) {
            Active.Cart.forEach(element => {
                net = net + element.cartQnt * element.Price
                if (element.withTax === false && element.Tax_Percent) {
                    Tax = Tax + ((element.cartQnt * element.Price) * element.Tax_Percent / 100)
                }
            });
        }

        if (Active.discount) {
            if (Active.discount === true) {
                if (Active.Discount) {
                    Dis = Active.Discount
                }
                if (Active.Percent) {
                    Dis = (Tax + net) * Active.Discount / 100
                }
            }
        }
        const amount = Number(net + Tax - Dis)
        return {
            SubTotal: Number(net),
            taxAmount: Number(Tax),
            discount: Number(Dis),
            total: amount.toFixed(2)
        }
    }
    const clearTakeAway = (Active) => {
        const id1 = Active.ClientId
        const id2 = Active._id
        return new Promise((resolve, reject) => {

            try {
                deleteItem(id1).then(() => {
                    setRecords(ActiveData)
                })
                deleteItem(id2).then(() => {
                    setRecords(ActiveData)
                    resolve()
                })

            } catch (error) {
                reject(error)
            }
        })

    }
    const clearTable = (Active) => {
        const id1 = Active.ClientId
        const id2 = Active._id
        return new Promise((resolve, reject) => {
            const New = {
                ClientId: id1,
                Cart: [],
                Ot: [],
                OTPrint: 0,
                OTSno: null,
                Type: 'Table',
                isActive: false,
            }
            try {
                editItem(id1, { table_Status: 'Inactive' }).then(() => {
                    setRecords(ActiveData)
                })
                editItem(id2, New).then(() => {
                    setRecords(ActiveData)
                    setNotify({
                        isOpen: true,
                        message: 'Clear Done!',
                        type: 'error'
                    })
                    resolve()
                })

            } catch (error) {
                reject(error)
            }
        })

    }
    const addUnfulFilled = (item) => {
        console.log(item)
        return new Promise((resolve, reject) => {
            const update = {
                BillSno: item.BillSno,
                Cart: item.Cart,
                ClientId: item.ClientId,
                OTPrint: item.OTPrint,
                OTSno: item.OTSno,
                Ot: item.Ot,
                Stutas: item.Stutas,
                Type: item.Type,
                createBy: item.createBy,
                dateTime: item.dateTime,
            }

            addItem('UnfulFilled', update).then((d) => {
                setRecords(ActiveData)
                resolve(d)
            }).catch((err) => {
                console.log('Error:', err)
                reject(err)
            });
        })

    }
    const onDelete = item => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        addUnfulFilled(item).then(() => {
            if (item.Type === 'TakeAway') {

                clearTakeAway(item).then(() => {
                    setNotify({
                        isOpen: true,
                        message: 'Clear Done!',
                        type: 'error'
                    })
                })
            }
            if (item.Type === 'Table') {

                clearTable(item).then(() => {
                    setNotify({
                        isOpen: true,
                        message: 'Clear Done!',
                        type: 'error'
                    })
                })
            }
        })

    }


    const DataTable = () => {

        return (
            <>
                {recordsAfterPagingAndSorting().length !== 0 ?
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map((item) => {
                                    if (item.OTSno) {
                                        return (
                                            <TableRow key={item._id}>
                                                <TableCell>{item.Type === 'TakeAway' ?
                                                    `Order Id ${item.displayNo}` :
                                                    `${item.Type} ${item.displayNo}`

                                                }</TableCell>                                            
                                                <TableCell>{item.OTSno}</TableCell>
                                                <TableCell>{item.ClientId && getStatus(item.ClientId)}</TableCell>
                                                <TableCell>{item.Type}</TableCell>
                                                <TableCell>{item && getAmount(item).total}</TableCell>
                                                <TableCell>
                                                    <Controls.ActionButton
                                                        color="secondary"
                                                        onClick={() => {
                                                            setConfirmDialog({
                                                                isOpen: true,
                                                                title: 'Are you sure to Clear this Billing?',
                                                                subTitle: "Sorry This operation Not abaile Now!",
                                                                onConfirm: () => { onDelete(item) }
                                                            })
                                                        }}>
                                                        <DeleteIcon fontSize="inherit" />
                                                    </Controls.ActionButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }

                                })
                            }
                        </TableBody>
                    </TblContainer>
                    :
                    <Info
                        title="You Have No Setup! "
                        subTitle="Create Your Shop SetUp Fast"
                        link={{ to: '/Pos', title: "Point Of Sale" }}
                    />
                }

            </>
        )


    }
    return (
        <>
            <Paper className={classes.Header} >
                <Controls.Input
                    label='Recipt No'
                    type="text"
                    className={classes.searchInput}
                    size="small"
                    InputProps={{
                        classes: { input: classes.resize },
                        startAdornment: (<InputAdornment position="start" size="small" style={{ padding: 2 }}>
                            <Search fontSize="inherit" />
                        </InputAdornment>)
                    }}
                    onChange={handleSearch}
                />
                {/* <Controls.Button
                    text="Add New"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={classes.newButton}
                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                /> */}
            </Paper>
            <Paper className={classes.Body} >
                {Clients.length === 0 ?
                    <Info
                        title="You Have No Dine In Set Up!"
                        subTitle="Go to Dine In Setup! Create With This Link"
                        link={{ to: '/TableSetup', title: "Dine In Setup" }}
                    />
                    : <DataTable />
                }
            </Paper>
            <Paper className={classes.Footer} >
                <TblPagination />
            </Paper>
            <Popup
                // title={"Tax"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )


}

const mapStateToProps = (state) => {
    return {
        data: state.DataStore,
        sync: state.SyncData,
        Cart: state.Cart,
    }
}
export default connect(mapStateToProps,)(Active)
