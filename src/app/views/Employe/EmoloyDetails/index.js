import React, { Component } from 'react';
import { CDataTable } from '@coreui/react'
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { EmployeConsumer } from '../../../LocalDB/EmoloyeDB'

class EmoloyDetails extends Component {
  render() {
    const fields = [
      { key: 'EmpolyeName', _style: { width: '20%' } },
      { key: 'Gender', _style: { width: '15%' } },
      { key: 'Mobile', _style: { width: '20%' } },
      { key: 'City', _style: { width: '5%' } },
      { key: 'Salary', _style: { width: '5%' } },
      { key: 'Department', _style: { width: '10%' } },
      { key: 'Type', _style: { width: '10%' } },
      { key: 'Haier_Date', _style: { width: '10%' } },
      { key: 'Remove', _style: { width: '5%' } }, 
      
    ]
    return (
      <EmployeConsumer>
        {({ users, handleremove }) => (
          <CDataTable
            items={users}
            fields={fields}
            columnFilter
            sorter
            style={{ height: '100%', width: '100%', }}
            scopedSlots={{
              'Remove':
                (item, index) => {
                  return (
                    <td className="py-2" style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center'
                    }}
                    >
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        size="small"
                        onClick={() => handleremove(item.public_id)}

                      >
                        <DeleteForeverIcon fontSize="inherit" />
                      </IconButton>
                    </td>
                  )
                },
            }}
          />
        )}
      </EmployeConsumer>
    );
  }

}
export default EmoloyDetails

