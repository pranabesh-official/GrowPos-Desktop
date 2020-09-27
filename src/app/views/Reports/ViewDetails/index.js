import React, { useRef, Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles';
import Controls from '../../../components/controls/Controls'
import PrintIcon from '@material-ui/icons/Print';
import { Grid, Paper } from '@material-ui/core'
import { useReactToPrint } from 'react-to-print'
import Table from 'react-bootstrap/Table'
import {gettime} from '../../../Utils'
import './table.css'


const useStyles = makeStyles((theme) => ({
    PrintBody: props => {
        return {
            ...theme.GlobalBox,
            background: '#00000000',
            width: 900
        }
    },
    newButton: {
        position: 'absolute',
        right: '10px',
        bottom: '10px'
    },

}));


class PrintTable extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }
    render() {
        const { recordForEdit } = this.props
        return (
            <Grid container spacing={1} style={{ padding: 35, paddingTop: 5 }}>
                <Grid item xs={12} sm={12} md={12}>
                    <Table bordered size="sm" className="mx-0 my-0">
                        <thead >
                            <tr>
                                <th>Recipt No</th>
                                <th>Order Type</th>
                                <th>Create By</th>
                                <th>Payment Type</th>
                                <th>Time</th>
                                <th>Sub Total</th>
                                <th>Tax </th>
                                <th>Discount </th>
                                <th>Complementary</th>
                                <th>Total Amount</th>
                                <th>Cash Tendered By Customer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td  >{recordForEdit.OrderSno}</td>

                                <td  >{recordForEdit.OrderType}</td>

                                <td  >{recordForEdit.createBy}</td>

                                <td  >{recordForEdit.paymentType}</td>

                                <td>{gettime(recordForEdit.dateTime)}</td>

                                <td >{recordForEdit.SubTotal}</td>

                                <td>{recordForEdit.taxAmount}</td>

                                <td>{recordForEdit.discount}</td>

                                <td >
                                    <strong>{
                                        recordForEdit.Complementary ?
                                            <Icon color='green' name='checkmark' size='small' />
                                            :
                                            <Icon color='red' name='remove' size='small' />
                                    }</strong>
                                </td>
                                <td >
                                    <strong>{recordForEdit.total}</strong>
                                </td>
                                <td >
                                    <strong>{recordForEdit.reciveAmount}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Grid>
                <Grid item xs={7} sm={7} md={7}  >
                    <Table bordered size="sm" className="mx-0 my-0" >
                        <thead >
                            <tr>
                                <th>{'Item'}</th>
                                <th>Price</th>
                                <th>Qnt</th>
                                <th>total</th>
                            </tr>
                        </thead>
                        <tbody >
                            {recordForEdit.products.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.Name}</td>
                                    <td>{item.Price}</td>
                                    <td>
                                        {item.cartQnt}
                                    </td>
                                    <td>{item.Price * item.cartQnt}</td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>
                </Grid>
            </Grid>
        )
    }
}
const ViewDetails = (props) => {
    const { recordForEdit } = props
    const classes = useStyles();
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })
    return (
        <Grid container direction='column' >
            <Grid item xs={12} sm={12}>
                <Paper className={classes.PrintBody} >
                    <PrintTable recordForEdit={recordForEdit} ref={componentRef} />
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
                <Paper className={classes.PrintBody}>
                    <Controls.Button
                        text="Print"
                        variant="outlined"
                        startIcon={<PrintIcon />}
                        // size='medium'
                        className={classes.newButton}
                        onClick={handlePrint}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ViewDetails