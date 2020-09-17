import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TableBody, TableRow, TableCell, InputAdornment } from '@material-ui/core';
import useTable from '../../../../components/Datatable'
import { DataContext } from '../../../../LocalDB'
import AddIcon from '@material-ui/icons/Add';
import { Search } from "@material-ui/icons";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Controls from '../../../../components/controls/Controls'
import Dot from '../../../../components/statusDot'
import Popup from '../../../../components/Popup'
import Addcategory from '../AddCategory'
import { connect } from 'react-redux'
import Notification from "../../../../components/Notification";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import Info from '../../../../components/infoPage'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    Header: props => {
        return {
            ...theme.GlobalBox,
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
    { _id: 'Name', label: 'Category Name' },
    { _id: 'Source', label: 'Source' },
    { _id: 'Type', label: 'Type', },
    { _id: 'actions', label: 'Actions', disableSorting: true }
]

const Setup = (props) => {
    const { addItem, editItem, deleteItem } = useContext(DataContext) //
    const { Category , Source} = props.data
    const [records, setRecords] = useState(Category)
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
                    return items.filter(x => x.Name.toLowerCase().includes(target.value))
            }
        })
    }

    useEffect(() => {
        setRecords(Category)
    }, [Category])

    const addOrEdit = (data, resetForm) => {
        if (data._id === null)
            addItem('Category', data).then(() => {
                resetForm()
                setOpenPopup(false)
                setRecords(Category)
                setNotify({
                    isOpen: true,
                    message: 'Submitted Successfully',
                    type: 'success'
                })
            })
        if (data._id)
            editItem(data._id, data).then(() => {
                resetForm()
                setOpenPopup(false)
                setRecords(Category)
                setRecordForEdit(null)
                setNotify({
                    isOpen: true,
                    message: 'Submitted Successfully',
                    type: 'success'
                })
            })

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
            setRecords(Category)
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
                                <TableCell>{item.Name}</TableCell>
                                <TableCell>{item.Source}</TableCell>
                                <TableCell>{item.Type}</TableCell>
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
                        title="No Category Data Found!"
                        subTitle={Source.length !== 0 ?
                            "Create New Category using Add new Button ! then select Category and Add Tax Percent! this Will Effect On All Actegory In your Tax!"
                            :
                            "You Have No Source Data! Create A Source Fast! "
                        }
                        link={Source.length !== 0 ? null : {to:'/CategorySetup' , title:"Source Setup"}}
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
                <Addcategory
                    addOrEdit={addOrEdit}
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
