import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core'
import Table from 'react-bootstrap/Table'
import { getDate } from '../../../Utils'
import './table.css'

const style = (theme) => ({
    Header: {
        ...theme.GlobalBox,
        padding: 5,
        textAlign: 'center'
        // overflow: 'auto',
    },
    PrintBody: props => {
        return {
            ...theme.GlobalBox,
            background: '#00000000',
            width: 840
        }
    },
    newButton: {
        position: 'absolute',
        right: '10px',
        bottom: '10px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(24),
        flexBasis: '33.33%',
        flexShrink: 0,
        color: theme.palette.dark.main
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(10),
    }

});




class PrintTable extends Component {
    constructor(props) {
        super(props)
        this.state = {

        };
    }
    render() {
        const { classes } = this.props;
        const { recordsAfterPagingAndSorting, Format, tab } = this.props
        const SubHeader = Format.find(item => item.filterBy === tab)
        return (
            <Grid container direction='column'>
                <Paper className={classes.Header}>
                    <Typography className={classes.heading}>{SubHeader.repotName}</Typography>
                </Paper>
                {recordsAfterPagingAndSorting().map((item) => (
                    <Grid container spacing={1} style={{
                        padding: 35,
                        paddingTop: 5,
                    }} key={item._id} >
                        <Grid item xs={12} sm={12} md={12}>
                            <Table bordered size="sm" className="mx-0 my-0">
                                <thead >
                                    <tr>
                                        <th>Recipt No</th>
                                        <th>Order Type</th>
                                        <th>Create By</th>
                                        <th>Payment Type</th>
                                        <th>Date</th>
                                        <th>Sub Total</th>
                                        <th>Tax </th>
                                        <th>Discount </th>
                                        <th>Complementary</th>
                                        <th>Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td  >{item.OrderSno}</td>

                                        <td  >{item.OrderType}</td>

                                        <td  >{item.createBy}</td>

                                        <td  >{item.paymentType}</td>

                                        <td>{getDate(item.dateTime)}</td>

                                        <td >{item.SubTotal}</td>

                                        <td>{item.taxAmount}</td>

                                        <td>{item.discount}</td>

                                        <td >
                                            <strong>{
                                                item.Complementary ?
                                                    <Icon color='green' name='checkmark' size='small' />
                                                    :
                                                    <Icon color='red' name='remove' size='small' />
                                            }</strong>
                                        </td>
                                        <td >
                                            <strong>{item.total}</strong>
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
                                    {item.products.map((prod) => (
                                        <tr key={prod._id}>
                                            <td>{prod.Name}</td>
                                            <td>{prod.Price}</td>
                                            <td>
                                                {prod.cartQnt}
                                            </td>
                                            <td>{prod.Price * prod.cartQnt}</td>
                                        </tr>

                                    ))}
                                </tbody>
                            </Table>
                        </Grid>
                    </Grid>
                ))}

            </Grid>
        )
    }
}

export default withStyles(style, { withTheme: true })(PrintTable)
// export default PrintTable