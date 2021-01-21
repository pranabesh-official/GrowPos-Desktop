import React, { useContext, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputAdornment, Grid } from '@material-ui/core';
import useTable from '../../../components/Datatable'
import { DataContext } from '../../../LocalDB'
import { Search } from "@material-ui/icons";
import Controls from '../../../components/controls/Controls'
import Popup from '../../../components/Popup'
import PrintPopup from '../../../components/PrintPopup'
import PrintIcon from '@material-ui/icons/Print';
import { connect } from 'react-redux'
import Notification from "../../../components/Notification";
import ConfirmDialog from "../../../components/ConfirmDialog";
// import Info from '../../../components/infoPage'
import ViewDetails from '../ViewDetails'
import PrintTable from '../ViweAllDetails'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import DataTable from './DataTable'
import { useReactToPrint } from 'react-to-print'
import PropTypes from 'prop-types';;


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
            width: '100%',
            padding:0
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
    },
    PrintBody: props => {
        return {
            ...theme.GlobalBox,
            background: '#00000000',
            width: 840
        }
    },
    root: props => {
        return {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            height: `${(props.height - 68) - 100}px`,
            borderTop: `1px solid ${theme.palette.divider}`
        }
    },
    CartBody: props => {
        return {
            ...theme.GlobalBox,
            padding: '0 0px',
            background: 'white',
            overflow: 'auto',
            height: '100%',
            width: '100%'
        }
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tab: {
        width: 90,
        padding: 0,
        margin:0

    },
    Box: {
        height: '100%',
        width: '100%',
        padding:0,
        margin:0
    },
    TabPanel: {
        height: '100%',
        width: '100%',
        padding:0,
        margin:0
    }
}));

const headCells = [
    { _id: 'Sync', label: 'Status', disableSorting: true },
    { _id: 'OrderSno', label: 'Recept No' },
    { _id: 'OrderType', label: 'Order Type' },
    { _id: 'total', label: 'Total Amount', },
    { _id: 'reciveAmount', label: 'Cash Tendered', },
    { _id: 'date', label: 'Date' },
    { _id: 'actions', label: 'Actions', disableSorting: true }
]

const Format = [
    { _id: 0, label: 'All', filterBy: "All", type: null , repotName:"ALL SALE REPORT" },
    { _id: 1, label: 'Table', filterBy: "Table", type: "client" , repotName:"TABLE SALE REPORT"},
    { _id: 2, label: 'Take Away', filterBy: "TakeAway", type: "client", repotName:"TAKE AWAY REPORT" },
    { _id: 3, label: 'Cash', filterBy: "CASH", type: "payment", repotName:"CASH SALE REPORT" },
    { _id: 4, label: 'Card', filterBy: "CARD", type: "payment" , repotName:"CARD SALE REPORT"},
]
function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    const classes = useStyles();
    return (
        <div
            role="tabpanel"
            className={classes.TabPanel}
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className={classes.Box} >
                    { children}
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const Setup = (props) => {
    const { deleteItem } = useContext(DataContext) //
    const { SellReport } = props.data
    const [records, setRecords] = useState(SellReport)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const classes = useStyles(props);
    const [openPopup, setOpenPopup] = useState(false)
    const [openPrintPopup, setOpenPrintPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [value, setValue] = useState(0);
    const [tab, setTab] = useState("All");



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    // const DateSearch = e => {
    //     let target = e.target;
    //     setFilterFn({
    //         fn: items => {
    //             if (target.value === "")
    //                 return items;
    //             else
    //                 return items.filter(x => x.dateTime.toLowerCase().includes(target.value))
    //         }
    //     })
    // }

    useEffect(() => {
        setTab(Format[value].filterBy)
    }, [value])



    useEffect(() => {
        const filter = Format.find(item => item.filterBy === tab)
        if (filter.type === 'client') {
            const Report = SellReport.filter(item => item.OrderType === tab)
            setRecords(Report)
        }
        if (filter.type === 'payment') {
            const Report = SellReport.filter(item => item.paymentType === tab)
            setRecords(Report)
        }
        if (filter.type === null) {
            setRecords(SellReport)
        }

    }, [tab, SellReport])


    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    console.log(SellReport)
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

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })

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
                {/* <Controls.Input
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
                /> */}
                <Controls.Button
                    text="Print"
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    className={classes.newButton}
                    onClick={() => { setOpenPrintPopup(true) }}
                />
            </Paper>
            <Paper className={classes.Body} >
                <div className={classes.root}>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        {Format.map((item, index) => (
                            <Tab label={item.label} {...a11yProps(index)} wrapped key={item._id} />
                        ))}

                    </Tabs>
                    {Format.map((item, index) => (
                        <TabPanel value={value} index={index} key={item._id} >
                            < DataTable
                                TblContainer={TblContainer}
                                TblHead={TblHead}
                                recordsAfterPagingAndSorting={recordsAfterPagingAndSorting}
                                openInPopup={openInPopup}
                                onDelete={onDelete}
                                setConfirmDialog={setConfirmDialog}
                            />
                        </TabPanel>
                    ))}
                </div>

            </Paper>
            <Paper className={classes.Footer} >
                <TblPagination />
            </Paper>
            <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <ViewDetails
                    recordForEdit={recordForEdit}
                />
            </Popup>
            <PrintPopup
                handlePrint={handlePrint}
                openPrintPopup={openPrintPopup}
                setOpenPrintPopup={setOpenPrintPopup}
            >
                <Grid container direction='column' >
                    <Grid item xs={12} sm={12}>
                        <Paper className={classes.PrintBody} >
                            <PrintTable
                                recordsAfterPagingAndSorting={recordsAfterPagingAndSorting}
                                ref={componentRef}
                                Format={Format}
                                tab={tab}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </PrintPopup>
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















