import React from 'react'


const test = ()=>(
    <Table striped bordered hover size="sm">
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
                        <strong>{recordForEdit.Complementary && <Icon color='green' name='checkmark' size='small' />}</strong>
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
)