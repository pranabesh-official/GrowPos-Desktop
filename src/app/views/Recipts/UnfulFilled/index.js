import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TableBody, TableRow, TableCell, InputAdornment } from '@material-ui/core';
import useTable from '../../../components/Datatable'
import { DataContext } from '../../../LocalDB'
import { Search } from "@material-ui/icons";
// import VisibilityIcon from '@material-ui/icons/Visibility';
import Controls from '../../../components/controls/Controls'
import Dot from '../../../components/statusDot'
import Popup from '../../../components/Popup'
import { connect } from 'react-redux'
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
import Info from '../../../components/infoPage'
import DeleteIcon from '@material-ui/icons/Delete';


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
    { _id: 'OTSno', label: 'Recipt No' },
    { _id: 'Type', label: 'Type' },
    { _id: 'Amount', label: 'Total Amount', },
    { _id: 'actions', label: 'Actions', disableSorting: true }
]

const UnfulFilled = (props) => {
    const { deleteItem } = useContext(DataContext) //
    const { UnfulFilled } = props.data
    const [records, setRecords] = useState(UnfulFilled)
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
                    return items.filter(x => x.OTSno.toLowerCase().includes(target.value))
            }
        })
    }

    useEffect(() => {
        setRecords(UnfulFilled)
    }, [UnfulFilled])

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
    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteItem(id).then(() => {
            setRecords(UnfulFilled)
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
                                <TableCell>{item.OTSno}</TableCell>
                                <TableCell>{item.Type}</TableCell>                              
                                <TableCell>{getAmount(item).total}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Are you sure to delete this record?',
                                                subTitle: "You can't undo this operation",
                                                onConfirm: () => { onDelete(item._id, item.Income) }
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
                    onChange={ReceptSearch}
                />

            </Paper>
            <Paper className={classes.Body} >
                {recordsAfterPagingAndSorting().length === 0 ?
                    <Info
                        title="No UnfulFilled Data Found!"
                        subTitle="If You Delete Any Active Recipt You can Find Hear!"
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
                {/* <ViewDetails
                    recordForEdit={recordForEdit}
                /> */}
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
export default connect(mapStateToProps,)(UnfulFilled)
