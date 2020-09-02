import React, { Component } from 'react';
import DataTable from '../../../LayoutManeger/Datatable'
import { DataConsumer } from '../../../DataManeger'

class ViweProduct extends Component {
  render() {
    const fields = [
      { key: 'id', _style: { width: '5%' } },
      { key: 'Name', _style: { width: '20%' } },
      { key: 'Category', _style: { width: '15%' } },
      { key: 'Tax_Group_Name', _style: { width: '20%' } },
      { key: 'Percent', _style: { width: '5%' } },
      { key: 'Price', _style: { width: '10%' } },
      { key: 'Cost', _style: { width: '10%' } },
      { key: 'Qnt', _style: { width: '10%' } },
      { key: 'Remove', _style: { width: '5%' } },

    ]
    return (
      <DataConsumer>
        {({ Products}) => (
          <DataTable
          fields={fields}
          Data={Products}
          url={'products'}
          />
        )}
      </DataConsumer>

    );
  }

}
export default ViweProduct