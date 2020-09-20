import React, { useContext, useState } from 'react'
import { Grid } from '@material-ui/core'; //Chip
import Controls from "../../../components/controls/Controls";
import { useForm } from '../../../components/useForm';
import { DataContext } from '../../../LocalDB'
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'
import { Refresh } from '../../../store/action/Cart'
import { Icon } from 'semantic-ui-react'



const Settlement = (props) => {
  const { BillData, setOpenPopup, Active, handleTabChange, SaveTickets, Delete } = props
  const { editItem, addItem, deleteItem } = useContext(DataContext)
  const [loading, setLoading] = useState(false)
  const paymentOpstion = [
    { _id: 'CASH', Name: 'Cash' },
    { _id: 'CARD', Name: 'Card' },
    { _id: 'PAYTM', Name: 'Paytm' },
  ]
  const initialFValues = {
    reciveAmount: 0,
    paymentType: '',
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if (!Active.free) {
      if ('reciveAmount' in fieldValues)
        temp.reciveAmount = fieldValues.reciveAmount !== 0 ? "" : "This field is required."
      if ('paymentType' in fieldValues)
        temp.paymentType = fieldValues.paymentType ? "" : "This field is required."
    }
    setErrors({
      ...temp
    })

    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }
  const {
    values,
    // setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);
  const addcustomer = (data) => {
    return new Promise((resolve, reject) => {
      addItem('CustomerDetails', data).then((result) => {
        resolve(result)
      }).catch((err) => {
        console.log('Error:', err)
        reject(err)
      });
    })
  }
  const SettlementPayment = () => {
    let Total = BillData.total
    if (Active.free) {
      Total = 0
    }
    const data = Object.assign(values, {
      SubTotal: BillData.SubTotal,
      taxAmount: BillData.taxAmount,
      discount: BillData.discount,
      total: Total,
      products: Active.Cart,
      OrderId: Active.displayNo,
      OrderSno: Active.OTSno,
      OrderPrint: Active.OTPrint,
      OrderType: Active.Type,
      Complementary: Active.free || false
    })
    return new Promise((resolve, reject) => {
      addItem('SellReport', data).then((result) => {
        const coustomerdata = {
          Sellid: result._id,
          reciptId: result.OrderSno,
          orderType: result.OrderType,
          products: result.products,
          SubTotal: result.SubTotal,
          taxAmount: result.taxAmount,
          discount: result.discount,
          total: result.total,
          Complementary:result.Complementary,
          OrderId:result.OrderId,
          paymentType:result.paymentType
        }
        if (Active.Mobile || Active.Name) {
          let newData = null
          if (Active.Name) {
            newData = Object.assign(coustomerdata, { Name: Active.Name })
          } 
          if (Active.Mobile){
             newData = Object.assign(coustomerdata, { Mobile: Active.Mobile,  })
          }
          addcustomer(newData).then(() => {
            resolve(result)
          })
        } else {
          resolve(result)
        }
      }).catch((err) => {
        console.log('Error:', err)
        reject(err)
      });
    })
  }
  const clear = () => {
    return new Promise((resolve, reject) => {
      const id1 = Active.ClientId
      const id2 = Active._id
      try {
        deleteItem(id1).then(() => {

        })
        deleteItem(id2).then(() => {
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    })

  }
  const handleSubmit = e => {
    e.preventDefault()
    if (validate()) {
      setLoading(true)
      if (SaveTickets) {
        const old = { SaveRecord: SaveTickets }
        const OrderTicket = Object.assign(old, {
          OrderId: Active.displayNo,
          OrderSno: Active.OTSno,
          OrderPrintTime: Active.OTPrint,
          OrderType: Active.Type

        })
        addItem('OrderTicket', OrderTicket).then(() => {
          SaveTickets.forEach(element => {
            try {
              Delete(element.id)
            } catch (error) {
              console.log(error)
            }

          });
        })
      }
      SettlementPayment().then((result) => {
        console.log(result)
        if (Active.Type === 'TakeAway') {
          clear().then(() => {
            setLoading(false)
            props.Refresh()
            setOpenPopup(false)
            handleTabChange(0, null)
          })

        }
        if (Active.Type === 'Table') {
          const New = {
            ClientId: Active.ClientId,
            Cart: [],
            Ot: [],
            OTPrint: 0,
            OTSno: null,
            Type: 'Table',
            isActive: false,
          }
          editItem(Active._id, New).then(() => {
            props.Refresh()
          })
          editItem(Active.ClientId, { table_Status: 'Inactive' }).then(() => {
            setLoading(false)
            setOpenPopup(false)
            handleTabChange(0, null)
          })
        }
      })
    }
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={6} >
        <Grid container spacing={1}>
          <Grid item xs={12} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Table striped bordered hover size="sm">
                  <tbody>
                    <tr>
                      <td className="left">
                        <strong>Sub Total</strong>
                      </td>
                      <td className="right" >{BillData.SubTotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong> Tax</strong>
                      </td>
                      <td className="right" >{BillData.taxAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Discount Amount</strong>
                      </td>
                      <td className="right" >{BillData.discount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Total</strong>
                      </td>
                      <td className="right" >
                        <strong>{BillData.total.toFixed(2)}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6} style={{ borderLeft: '1px solid #f0f0f0' }}>
        <Grid container spacing={1}>
          <Grid item xs={12} >
            <Controls.Input
              name="reciveAmount"
              label="Recive Amount"
              type="number"
              size="small"
              fullWidth
              disabled={Active.free}
              value={values.reciveAmount}
              onChange={handleInputChange}
              error={errors.Name}
            />
          </Grid>
          <Grid item xs={12} >
            <Controls.Select
              label="Payment Type"
              name="paymentType"
              size="small"
              fullWidth
              disabled={Active.free}
              options={paymentOpstion}
              optionsValue={'_id'}
              optionsDisplay={'Name'}
              value={values.Category_id}
              onChange={handleInputChange}
              error={errors.Category_id}
            />
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Controls.Button
          type="submit"
          text={Active.free ? 'Complementary' : "Submit"}
          startIcon={loading && <Icon loading name='spinner' size="small" />}
          onClick={handleSubmit} />
        <Controls.Button
          text="Reset"
          color="default"
          onClick={resetForm} />
      </div>
    </Grid>
  )

}

const mapStateToProps = (state) => {
  return {
    Cart: state.Cart,
  }
}
export default connect(mapStateToProps, { Refresh })(Settlement)





