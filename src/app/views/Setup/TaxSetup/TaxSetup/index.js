import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TableBody, TableRow, TableCell, InputAdornment } from '@material-ui/core';
import useTable from '../../../../components/Datatable'
import { DataContext } from '../../../../LocalDB'
import AddIcon from '@material-ui/icons/Add';
import { Search } from "@material-ui/icons";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Controls from '../../../../components/controls/Controls'
import Dot from '../../../../components/statusDot'
import Popup from '../../../../components/Popup'
import AddTax from '../AddTax'
import { connect } from 'react-redux'


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
    }
}));

const headCells = [
    { _id: 'Sync', label: 'Status', disableSorting: true },
    { _id: 'Name', label: 'TAX Name' },
    { _id: 'Category_Name', label: 'Category' },
    { _id: 'Percent', label: 'TAX Percent', },
    { _id: 'actions', label: 'Actions', disableSorting: true }
]

const Taxes = (props) => {
    const { addItem , editItem} = useContext(DataContext) //
    const { Tax } = props.data
    const [records, setRecords] = useState(Tax)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const classes = useStyles(props);
    const [openPopup, setOpenPopup] = useState(false)
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
                    return items.filter(x => x.Category_Name.toLowerCase().includes(target.value))
            }
        })
    }

    useEffect(() => {
        setRecords(Tax)
    }, [Tax])

    const addOrEdit = (data, resetForm) => {
        if (data._id === null)
            addItem('Tax', data).then(() => {
                resetForm()
                setOpenPopup(false)
                setRecords(Tax)
            })
        if(data._id)
            editItem(data._id, data).then(() => {
                resetForm()
                setOpenPopup(false)
                setRecords(Tax)
                setRecordForEdit(null)
            })



        // setRecordForEdit(null)
        // setNotify({
        //     isOpen: true,
        //     message: 'Submitted Successfully',
        //     type: 'success'
        // })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    return (
        <>
            <Paper className={classes.Header} >
                <Controls.Input
                    label='Category'
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
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        {item.isSync ? <Dot color={'green'} position="start" mx={2} Size={10} />
                                            : <Dot color={'red'} position="start" mx={2} Size={10} />}
                                    </TableCell>
                                    <TableCell>{item.Name}</TableCell>
                                    <TableCell>{item.Category_Name}</TableCell>
                                    <TableCell>{item.Percent}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}
                                        >
                                            <EditOutlinedIcon fontSize="inherit" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"

                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
            </Paper>
            <Paper className={classes.Footer} >
                <TblPagination />
            </Paper>
            <Popup
                // title={"Tax"}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <AddTax
                    addOrEdit={addOrEdit}
                    recordForEdit={recordForEdit}
                />
            </Popup>
        </>
    )


}

const mapStateToProps = (state) => {
    return {
        data: state.DataStore,
        sync: state.SyncData,
    }
}
export default connect(mapStateToProps,)(Taxes)
