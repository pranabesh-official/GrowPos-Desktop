import React, { useContext, useState } from 'react'
import { Grid } from '@material-ui/core'; //Chip
import Controls from "../../../components/controls/Controls";
import { useForm } from '../../../components/useForm';
import { DataContext } from '../../../LocalDB'
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'
import { Refresh } from '../../../store/action/Cart'
import { Icon } from 'semantic-ui-react'
import Notification from "../../../components/Notification";
const paymentOpstion = [
  { _id: 'CASH', Name: 'Cash' },
  { _id: 'CARD', Name: 'Credit/Debit Card' },

]

const Settlement = (props) => {
  const { BillData, setOpenPopup, Active, handleTabChange, SaveTickets, Delete } = props
  const { editItem, addItem, deleteItem, Registers } = useContext(DataContext)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [loading, setLoading] = useState(false)
  const initialFValues = {
    reciveAmount: 0,
    paymentType: 'CASH',
    Note: '',
    Register: ''
  }
  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if (!Active.free) {
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
  const UpdateRegister = (total) => {
    const amount = total
    if (values.paymentType === 'CASH') {
      const reg = Registers.find(item => item._id === values.Register)
      const updateIncome = Object.assign(reg, { Income: Number(reg.Income) + Number(amount )})
      return new Promise((resolve, reject) => {
        editItem(values.Register, updateIncome).then((result) => {
          resolve(result)
        }).catch((err) => {
          console.log('Error:', err)
          reject(err)
        });
      })
    }
    if (values.paymentType === 'CARD') {
      const reg = Registers.find(item => item._id === values.Register)
      const updateIncome = Object.assign(reg, { Diposite: Number(reg.Diposite) + Number(amount) })
      return new Promise((resolve, reject) => {
        editItem(values.Register, updateIncome).then((result) => {
          resolve(result)
        }).catch((err) => {
          console.log('Error:', err)
          reject(err)
        });
      })
    }

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
          Complementary: result.Complementary,
          OrderId: result.OrderId,
          paymentType: result.paymentType
        }
        if (Active.Mobile || Active.Name) {
          let newData = null
          if (Active.Name) {
            newData = Object.assign(coustomerdata, { Name: Active.Name })
          }
          if (Active.Mobile) {
            newData = Object.assign(coustomerdata, { Mobile: Active.Mobile, })
          }
          UpdateRegister(result.total).then(() => { })
          addcustomer(newData).then(() => {
            resolve(result)
          })

        } else {
          UpdateRegister(result.total).then(() => {
            resolve(result)
          })  
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
    if (values.Register) {
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
    } else {
      setNotify({
        isOpen: true,
        message: ` Please Select Register `,
        type: 'warning'
      })
    }

  }
  // console.log(Registers)
  return (
    <Grid container spacing={1} style={{ maxWidth: 600 }}>
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
            <Controls.Select
              label="Select Register"
              name="Register"
              size="small"
              options={Registers}
              fullWidth
              optionsValue={'_id'}
              optionsDisplay={'Name'}
              value={values.Register}
              onChange={handleInputChange}
              error={errors.Register}
            />
          </Grid>
          <Grid item xs={12} >
            <Controls.RadioGroup
              // label="Payment Type"
              name="paymentType"
              size="small"
              disabled={Active.free}
              options={paymentOpstion}
              optionsValue={'_id'}
              optionsDisplay={'Name'}
              value={values.paymentType}
              onChange={handleInputChange}
              error={errors.paymentType}
            />
          </Grid>
          {values.paymentType === 'CASH' &&
            <>
              <Grid item xs={6} >
                <Controls.Input
                  name="reciveAmount"
                  label="Cash Tendered"
                  type="number"
                  size="small"
                  fullWidth
                  disabled={Active.free}
                  value={values.reciveAmount}
                  onChange={handleInputChange}
                  error={errors.Name}
                />
              </Grid>
              <Grid item xs={6} >
                <Controls.Input
                  name="BalancetoCustomer"
                  label="Balance to Customer"
                  type="number"
                  size="small"
                  value={values.reciveAmount !== 0 && values.reciveAmount > 0 && values.reciveAmount !== "" ?
                    values.reciveAmount - BillData.total :
                    BillData.total
                  }
                  fullWidth
                  disabled
                />
              </Grid>

            </>
          }
          <Grid item xs={12} >
            <Controls.Input
              name="Note"
              label="Remark Note !"
              type="number"
              size="small"
              value={values.Note}
              onChange={handleInputChange}
              fullWidth
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
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </Grid>

  )

}

const mapStateToProps = (state) => {
  return {
    Cart: state.Cart,
  }
}
export default connect(mapStateToProps, { Refresh })(Settlement)





