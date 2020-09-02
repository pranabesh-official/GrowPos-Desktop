import React, { Component } from 'react';
import { DataConsumer } from '../../../../LocalDB'
import Dot from '../../../LayoutManeger/statusDot'
import { CDataTable } from '@coreui/react'
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class ViewData extends Component {
  render() {
    const fields = [
      { key: 'Sync', _style: { width: '5%', fontSize: '14px' } },
      { key: 'Name', _style: { width: '30%' } },
      { key: 'Tax_Group_Name', _style: { width: '35%' } },
      { key: 'Percent', _style: { width: '20%' } },
      { key: 'Remove', _style: { width: '5%', fontSize: '14px' } }
    ]
    
    return (
      <DataConsumer>
      {({ Tax , deleteItem}) => (
        <CDataTable
          items={Tax}
          fields={fields}
          columnFilter
          sorter
          style={{ height: '100%', width: '100%', }}
          scopedSlots={{
            'Sync':
              (item) => (
                <td>
             
                  {item.isSync? <Dot color={'green'} position="center" mx={2} Size={10} />
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
export default ViewData