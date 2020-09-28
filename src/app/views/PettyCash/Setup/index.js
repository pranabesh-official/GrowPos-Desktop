import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TableBody, TableRow, TableCell, InputAdornment } from '@material-ui/core';
import useTable from '../../../components/Datatable'
import { DataContext } from '../../../LocalDB'
import { Search } from "@material-ui/icons";
import Controls from '../../../components/controls/Controls'
import Dot from '../../../components/statusDot'
import Popup from '../../../components/Popup'
import { connect } from 'react-redux'
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import Info from '../../../components/infoPage'
import DeleteIcon from '@material-ui/icons/Delete';
import CashManage from '../AddorOut'
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { getDate, getNameById } from '../../../Utils'
import { ArrowDropUp, ArrowDropDown } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    Header: props => {
        return {
            ...theme.GlobalBox,
            border: 0,
            padding: 8,
            height: `${48}px`,
            width: '100%',
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

const SelectType = [
    { _id: "CashOut", Name: 'Cash Out' },
    { _id: "CashIn", Name: 'Cash In' },
    { _id: "Diposite", Name: 'Diposite' },
]
const headCells = [
    { _id: 'Sync', label: 'Status', disableSorting: true },
    { _id: 'registerId', label: 'Register Name' },
    { _id: 'cash', label: 'Cash' },
    { _id: 'Type', label: 'Type' },
    { _id: 'note', label: 'Note' },
    { _id: 'date', label: 'Date' },
    { _id: 'actions', label: 'Actions', disableSorting: true }
]

const Setup = (props) => {
    const { addItem, deleteItem, editItem } = useContext(DataContext) //
    const { PettyCash, Registers } = props.data
    const [records, setRecords] = useState(PettyCash)
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
    const search = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.filtr.toLowerCase().includes(target.value))
            }
        })
    }

    useEffect(() => {
        setRecords(PettyCash)
    }, [PettyCash])

    const addOrEdit = (data, resetForm) => {
        const cashbok = Registers.find(item => item._id === data.Register)
        if (data._id === null) {
            const newData = Object.assign(data, { filtr: cashbok.Name })
            addItem('PettyCash', newData).then(() => { })
            if (data.Type === "CashOut") {
                const updatedBook = Object.assign(cashbok, {
                    Income: Number(cashbok.Income) - Number(data.Amount),
                    Expence: Number(cashbok.Expence) + Number(data.Amount)
                })
                editItem(data.Register, updatedBook).then(() => {
                    resetForm()
                    setOpenPopup(false)
                    setRecords(PettyCash)
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                })
            }
            if (data.Type === "CashIn") {
                const updatedBook = Object.assign(cashbok, { Income: Number(cashbok.Income) + Number(data.Amount) })
                editItem(data.Register, updatedBook).then(() => {
                    resetForm()
                    setOpenPopup(false)
                    setRecords(PettyCash)
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                })
            }
            if (data.Type === "Diposite") {
                const updatedBook = Object.assign(cashbok, {
                    Income: Number(cashbok.Income) - Number(data.Amount),
                    Diposite:Number(cashbok.Diposite) + Number(data.Amount),
                })
                editItem(data.Register, updatedBook).then(() => {
                    resetForm()
                    setOpenPopup(false)
                    setRecords(PettyCash)
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                })
            }
        }
        if (data._id) {
            const old = PettyCash.find(item => item._id === data._id)
            editItem(data._id, data).then(() => { })
            if (data.Type === "CashOut") {
                const updatedBook = Object.assign(cashbok, { 
                    Income: Number(cashbok.Income) - Number(data.Amount) + Number(old.Amount) ,
                    Expence: Number(cashbok.Expence) + Number(data.Amount) - Number(old.Amount) 
                })
                editItem(data.Register, updatedBook).then(() => {
                    resetForm()
                    setOpenPopup(false)
                    setRecords(PettyCash)
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                })
            }
            if (data.Type === "CashIn") {
                const updatedBook = Object.assign(cashbok, { Income: Number(cashbok.Income) + Number(data.Amount) - Number(old.Amount) })
                editItem(data.Register, updatedBook).then(() => {
                    resetForm()
                    setOpenPopup(false)
                    setRecords(PettyCash)
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                })
            }
            if (data.Type === "Diposite") {
                const updatedBook = Object.assign(cashbok, { 
                    Income: Number(cashbok.Income) - Number(data.Amount) + Number(old.Amount) ,
                    Diposite: Number(cashbok.Diposite) + Number(data.Amount) - Number(old.Amount) 
                })
                editItem(data.Register, updatedBook).then(() => {
                    resetForm()
                    setOpenPopup(false)
                    setRecords(PettyCash)
                    setNotify({
                        isOpen: true,
                        message: 'Submitted Successfully',
                        type: 'success'
                    })
                })
            }
        }

    }

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
            setRecords(PettyCash)
            setNotify({
                isOpen: true,
                message: 'Deleted Successfully',
                type: 'error'
            })

        })
    }
    console.log(Registers)
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
                                <TableCell>{getNameById(Registers, item.Register)}</TableCell>
                                <TableCell>{item.Type === "CashOut" ?
                                    <>
                                        {item.Amount} <ArrowDropDown fontSize='inherit' />
                                    </>
                                    :
                                    <>
                                        {item.Amount} <ArrowDropUp fontSize='inherit' />
                                    </>
                                }
                                </TableCell>
                                <TableCell>{getNameById(SelectType, item.Type)}</TableCell>
                                <TableCell>{item.Note}</TableCell>
                                <TableCell>{getDate(item.dateTime)}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { openInPopup(item) }}
                                    >
                                        <EditOutlinedIcon fontSize="inherit" />
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
                    label='Register Name'
                    type="text"
                    className={classes.searchInput}
                    size="small"
                    InputProps={{
                        classes: { input: classes.resize },
                        startAdornment: (<InputAdornment position="start" size="small" style={{ padding: 2 }}>
                            <Search fontSize="inherit" />
                        </InputAdornment>)
                    }}
                    onChange={search}
                />
                <Controls.Button
                    text="Add New"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    className={classes.newButton}
                    onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                />
            </Paper>
            <Paper className={classes.Body} >
                {recordsAfterPagingAndSorting().length === 0 ?
                    <Info
                        title="No Petty Cash  Found!"
                        subTitle="You Can Handle Your Cash With Petty Cash! "

                    />
                    : <DataTable />
                }
            </Paper>
            <Paper className={classes.Footer} >
                <TblPagination />
            </Paper>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CashManage
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                    SelectType={SelectType}
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
