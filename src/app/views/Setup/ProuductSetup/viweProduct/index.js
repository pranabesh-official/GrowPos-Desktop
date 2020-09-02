import React, { Component } from 'react';
import { DataConsumer } from '../../../../LocalDB'
import { CDataTable } from '@coreui/react'
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dot from '../../../LayoutManeger/statusDot'

class ViweProduct extends Component {
  render() {
    const fields = [
      { key: 'Sync', _style: { width: '2%' } },
      { key: 'Name', _style: { width: '20%' } },
      { key: 'Category', _style: { width: '17%' } },
      { key: 'Cost', _style: { width: '10%' } },
      { key: 'Price', _style: { width: '10%' } },
      { key: 'Qnt', _style: { width: '2%' } },
      { key: 'Tax_Name', _style: { width: '10%' } },
      { key: 'Tax_Percent', _style: { width: '2%' } },
      // { key: 'Purchase_Date', _style: { width: '10%' } },
      // { key: 'Expire_Date', _style: { width: '10%' } },
      { key: 'Source_Name', _style: { width: '15%' } },
      { key: 'Type', _style: { width: '10%' } },
      { key: 'Remove', _style: { width: '2%', fontSize: '14px' } }

    ]
    return (
      <DataConsumer>
        {({ Products, deleteItem}) => (
          <CDataTable
          items={Products}
          fields={fields}
          columnFilter
          sorter
          style={{ height: '100%', width: '100%', }}
          scopedSlots={{
            'Sync':
              (item) => (
                <td>
                  
                  {item.isSync === true ? <Dot color={'green'} position="center" mx={2} Size={10} />
                    : <Dot color={'red'} position="center" mx={2} Size={10} />}
                </td>
              ),
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
                      onClick={() => deleteItem(item._id)}

                    >
                      <DeleteForeverIcon fontSize="inherit" />
                    </IconButton>
                  </td>
                )
              },
          }}
        />
        )}
      </DataConsumer>

    );
  }

}
export default ViweProduct