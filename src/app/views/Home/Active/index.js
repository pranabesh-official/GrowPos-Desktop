import React, { useState, useEffect, useContext } from 'react';//useContext
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TableBody, TableRow, TableCell, InputAdornment } from '@material-ui/core';//InputAdornment
import useTable from '../../../components/Datatable'
// import AddIcon from '@material-ui/icons/Add';
import { Search } from "@material-ui/icons";
import Controls from '../../../components/controls/Controls'
import Popup from '../../../components/Popup'
import { ShopHandeler } from '../../../LocalDB/ShopDB'
import { connect } from 'react-redux'
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import Info from '../../../components/infoPage'
import DeleteIcon from '@material-ui/icons/Delete';
// import AddProduct from '../addProduct/Add'


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
    { _id: 'Amount', label: 'Amount', },
    { _id: 'actions', label: 'Clear', disableSorting: true }
]

const Active = (props) => {

    const { ActiveData, Clients } = useContext(ShopHandeler)
    const DisplayTable = ActiveData.filter(item => item.Cart.length !== 0 && item.Cart.length > 0)//
    const [records, setRecords] = useState(DisplayTable)
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
                    return items.filter(x => x.OTSno.toLowerCase().includes(target.value))
            }
        })
    }

    useEffect(() => {
        const DisplayTable = ActiveData.filter(item => item.Cart.length !== 0 && item.Cart.length > 0)//
        setRecords(DisplayTable)
    }, [ActiveData])

    const getStatus = (id) => {
        const status = Clients.find(item => item._id === id)
        return status.table_Status
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
    const onDelete = item => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    }
    // console.log(ActiveData)

    const DataTable = () => {
        if (DisplayTable.length === 0) {
            return (
                <Info
                    title="You Have No Sale Running "
                    subTitle="Start Sale With This Link!"
                    link={{ to: '/Pos', title: "Point Of Sale" }}
                />
            )
        } else {
            return (
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((item) => (
                                <>
                                    <TableRow key={item._id}>
                                        <TableCell>{item.Type}</TableCell>
                                        <TableCell>{item.OTSno}</TableCell>
                                        <TableCell>{getStatus(item.ClientId)}</TableCell>
                                        <TableCell>{getAmount(item).total}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton
                                                color="secondary"
                                                disabled
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
                                </>

                            ))
                        }
                    </TableBody>
                </TblContainer>
            )
        }

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
    }
}
export default connect(mapStateToProps,)(Active)
