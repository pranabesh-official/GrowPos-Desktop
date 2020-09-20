import React, { useRef } from 'react'
import { Icon } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles';
import Controls from '../../../components/controls/Controls'
import PrintIcon from '@material-ui/icons/Print';
import { Grid, Paper } from '@material-ui/core'
import { useReactToPrint } from 'react-to-print'
import Table from 'react-bootstrap/Table'
import './table.css'


const useStyles = makeStyles((theme) => ({
    PrintBody: props => {
        return {
            ...theme.GlobalBox,
            background: '#00000000',
            width: 600
        }
    },
    newButton: {
        position: 'absolute',
        right: '10px',
        bottom: '10px'
    },

}));

const PrintTable = (props) => {
    const { recordForEdit } = props
    const classes = useStyles();
    return (
        <Paper className={classes.PrintBody} >
            <Grid container spacing={1} >
                <Grid item xs={4} sm={4} md={4}>
                    <Table bordered size="sm" className="mx-0 my-0">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <strong>Recipt No</strong>
                                </td>
                                <td className="right" >{recordForEdit.OrderSno}</td>
                            </tr>
                            <tr>
                                <td className="left">
                                    <strong> Order Type</strong>
                                </td>
                                <td className="right" >{recordForEdit.OrderType}</td>
                            </tr>
                            <tr>
                                <td className="left">
                                    <strong>Create By</strong>
                                </td>
                                <td className="right" >{recordForEdit.createBy}</td>
                            </tr>
                            <tr>
                                <td className="left">
                                    <strong>Payment Type</strong>
                                </td>
                                <td className="right" >{recordForEdit.paymentType}</td>
                            </tr>
                            <tr>
                                <td className="left">
                                    <strong>Time</strong>
                                </td>
                                <td className="right" >{recordForEdit.time}</td>
                            </tr>
                            <tr>
                                <td className="left">
                                    <strong>Sub Total</strong>
                                </td>
                                <td className="right" >{recordForEdit.SubTotal}</td>
                            </tr>
                            <tr>
                                <td className="left">
                                    <strong> Tax Amount</strong>
                                </td>
                                <td className="right" >{recordForEdit.taxAmount}</td>
                            </tr>
                            <tr>
                                <td className="left">
                                    <strong>Discount Amount</strong>
                                </td>
                                <td className="right" >{recordForEdit.discount}</td>
                            </tr>
                            <tr>
                                <td className="left">
                                    <strong>Complementary</strong>
                                </td>
                                <td className="right" >
                                    <strong>{
                                        recordForEdit.Complementary ?
                                            <Icon color='green' name='checkmark' size='small' />
                                            :
                                            <Icon color='red' name='remove' size='small' />
                                    }</strong>
                                </td>
                            </tr>
                            <tr>
                                <td className="left">
                                    <strong>Total Amount</strong>
                                </td>
                                <td className="right" >
                                    <strong>{recordForEdit.total}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Grid>
                <Grid item xs={8} sm={8} md={8}  >
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
        </Paper>
    )
}
const ViewDetails = (props) => {
    const { recordForEdit } = props
    const classes = useStyles();
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    })
    return (
        < >
            <PrintTable recordForEdit={recordForEdit} ref={componentRef} />
            <Paper className={classes.PrintBody}>
                <Controls.Button
                    text="Print"
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    size='medium'
                    className={classes.newButton}
                    onClick={handlePrint}
                />
            </Paper>
        </>
    )
}

export default ViewDetails