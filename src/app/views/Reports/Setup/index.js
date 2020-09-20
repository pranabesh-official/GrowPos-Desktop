import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TableBody, TableRow, TableCell, InputAdornment, Grid } from '@material-ui/core';
import useTable from '../../../components/Datatable'
import { DataContext } from '../../../LocalDB'
import { Search } from "@material-ui/icons";
import VisibilityIcon from '@material-ui/icons/Visibility';
import Controls from '../../../components/controls/Controls'
import Dot from '../../../components/statusDot'
import Popup from '../../../components/Popup'
import PrintIcon from '@material-ui/icons/Print';
import { connect } from 'react-redux'
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import Info from '../../../components/infoPage'
import DeleteIcon from '@material-ui/icons/Delete';
import ViewDetails from '../ViewDetails'
import DateRangeIcon from '@material-ui/icons/DateRange';

const useStyles = makeStyles((theme) => ({
    Header: props => {
        return {
            ...theme.GlobalBox,
            border: 0,
            padding: 8,
            height: `${48}px`,
            width: '100%',
            // borderBottom: '1px solid #f0f0f0'
        }
    },
    Body: props => {
        return {
            ...theme.GlobalBox,
            overflow: 'auto',
            height: `${(props.height - 68) - 100}px`,
            width: '100%'
        }
    },
    Footer: props => {
        return {
            ...theme.GlobalBox,
            padding: 0,
            width: '100%',
            height: `${52}px`,
            borderTop: '1px solid #f0f0f0'
        }
    },
    searchInput: {

        margin: '4px',
    },
    Select: {
        width: '40px',
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
    Selectresize: {
        width: 20,
        height: 27,
        fontSize: 11,
        padding: 2
    },
    CellContentent: {
        textAlign: 'center',
        justifyContent: 'center'
    }
}));

const headCells = [
    { _id: 'Sync', label: 'Status', disableSorting: true },
    { _id: 'OrderSno', label: 'Recept No' },
    { _id: 'OrderType', label: 'Order Type' },
    { _id: 'taxAmount', label: 'Tax Value', },
    { _id: 'discount', label: 'Discount Value', },
    { _id: 'total', label: 'Total Amount', },
    { _id: 'reciveAmount', label: 'Recive Amount', },
    { _id: 'date', label: 'Date' },
    { _id: 'actions', label: 'Actions', disableSorting: true }
]

const Setup = (props) => {
    const { deleteItem } = useContext(DataContext) //
    const { SellReport } = props.data
    const [records, setRecords] = useState(SellReport)
    const [recordForEdit, setRecordForEdit] = useState(null)
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
    const ReceptSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.OrderSno.toLowerCase().includes(target.value))
            }
        })
    }
    // const typeSearch = e => {
    //     let target = e.target;
    //     setFilterFn({
    //         fn: items => {
    //             if (target.value === "")
    //                 return items;
    //             else
    //                 return items.filter(x => x.OrderType.toLowerCase().includes(target.value))
    //         }
    //     })
    // }
    const DateSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.date.toLowerCase().includes(target.value))
            }
        })
    }
    useEffect(() => {
        setRecords(SellReport)
    }, [SellReport])

    // const type = [
    //     { _id: '1', Name: 'Table' },
    //     { _id: '2', Name: 'TakeAway' }
    // ]

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
   
    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteItem(id).then(() => {
            setRecords(SellReport)
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            })

        })
    }
    const DataTable = () => {
        return (
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map((item) => (
                            <TableRow key={item._id}>
                                <TableCell >
                                    {item.isSync ? <Dot color={'green'} position="center" mx={2} Size={10} />
                                        : <Dot color={'red'} position="center" mx={2} Size={10} />}
                                </TableCell>
                                <TableCell>{item.OrderSno}</TableCell>
                                <TableCell>{item.OrderType}</TableCell>
                                <TableCell>{item.taxAmount}</TableCell>
                                <TableCell>{item.discount}</TableCell>
                                <TableCell>{item.total}</TableCell>
                                <TableCell>{item.reciveAmount}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { openInPopup(item) }}
                                    >
                                        <VisibilityIcon fontSize="inherit" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Are you sure to delete this record?',
                                                subTitle: "You can't undo this operation",
                                                onConfirm: () => { onDelete(item._id) }
                                            })
                                        }}>
                                        <DeleteIcon fontSize="inherit" />
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TblContainer>
        )
    }
    return (
        <>
            <Paper className={classes.Header} >
                <Controls.Input
                    label='Recept No'
                    type="text"
                    className={classes.searchInput}
                    size="small"
                    InputProps={{
                        classes: { input: classes.resize },
                        startAdornment: (<InputAdornment position="start" size="small" style={{ padding: 2 }}>
                            <Search fontSize="inherit" />
                        </InputAdornment>)
                    }}
                    onChange={ReceptSearch}
                />
                <Controls.Input
                    label='Date'
                    type="text"
                    className={classes.searchInput}
                    size="small"
                    InputProps={{
                        classes: { input: classes.resize },
                        startAdornment: (<InputAdornment position="start" size="small" style={{ padding: 2 }}>
                            <DateRangeIcon fontSize="inherit" />
                        </InputAdornment>)
                    }}
                    onChange={DateSearch}
                />


                <Controls.Button
                    text="Print"
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    className={classes.newButton}
                    // onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                />
            </Paper>
            <Paper className={classes.Body} >
                {recordsAfterPagingAndSorting().length === 0 ?
                    <Info
                        title="No Sells Data Found!"
                        subTitle="Go To POS and Create Your Fast Sell"
                        link={{ to: '/Pos', title: "POS" }}
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
                <ViewDetails
                    recordForEdit={recordForEdit}
                />
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
export default connect(mapStateToProps,)(Setup)
