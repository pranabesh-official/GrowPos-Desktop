import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TableBody, TableRow, TableCell, InputAdornment } from '@material-ui/core';
import useTable from '../../../../components/Datatable'
// import { DataContext } from '../../../../LocalDB'
import AddIcon from '@material-ui/icons/Add';
import { Search } from "@material-ui/icons";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Controls from '../../../../components/controls/Controls'
import Dot from '../../../../components/statusDot'
import Popup from '../../../../components/Popup'
import AddEmploye from '../AddEmploye'
import { connect } from 'react-redux'
import Notification from "../../../../components/Notification";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import Info from '../../../../components/infoPage'
import DeleteIcon from '@material-ui/icons/Delete';
import { EmployeContex } from '../../../../LocalDB/EmoloyeDB'


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
        position: 'absolute',
        left: '10px',
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
    { _id: 'Sync', label: 'Status', disableSorting: true },
    { _id: 'EmpolyeName', label: 'Name' },
    { _id: 'Gender', label: 'Gender' },
    { _id: 'Mobile', label: 'Mobile', },
    { _id: 'City', label: 'City' },
    { _id: 'Salary', label: 'Salary' },
    { _id: 'Department', label: 'Department', },
    { _id: 'Type', label: 'Type' },
    { _id: 'Haier_Date', label: 'Haier Date', },
    { _id: 'actions', label: 'Actions', disableSorting: true }
]

const Setup = (props) => {
    // const { addItem, editItem, deleteItem } = useContext(DataContext) //
    const { users, handleremove } = useContext(EmployeContex)

    console.log(users)
    const [records, setRecords] = useState(users)
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
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.EmpolyeName.toLowerCase().includes(target.value))
            }
        })
    }

    useEffect(() => {
        setRecords(users)
    }, [users])


    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        handleremove(id)
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })


    }

    const DataTable = () => {
        return (
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map((item) => (
                            <TableRow key={item.id}>
                                <TableCell >
                                    {item.admin ?
                                        <LockOpenIcon fontSize='inherit' />
                                        :
                                        <LockIcon fontSize='inherit' />
                                    }
                                </TableCell>
                                <TableCell>{item.EmpolyeName}</TableCell>
                                <TableCell>{item.Gender}</TableCell>
                                <TableCell>{item.Mobile}</TableCell>
                                <TableCell>{item.City}</TableCell>
                                <TableCell>{item.Salary}</TableCell>
                                <TableCell>{item.Department}</TableCell>
                                <TableCell>{item.Type}</TableCell>
                                <TableCell>{item.Haier_Date}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                            if (item.Type === "SUPERUSER") {
                                                setNotify({
                                                    isOpen: true,
                                                    message: "This User Created By Devloper! You can't Do this operation",
                                                    type: 'error'
                                                })
                                            } else {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.public_id) }
                                                })
                                            }
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
                    label='Name'
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
                        title="No User Data Found!"
                        subTitle={
                            "Create New User using Add new Button ,"
                        }
                    // link={Category.length !== 0 ? null : {to:'/CategorySetup' , title:"Category Setup"}}
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
                <AddEmploye
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
