import React, { Component } from 'react';
import DataTable from '../../../LayoutManeger/Datatable'
import { DataConsumer } from '../../../DataManeger'

class ViweTable extends Component {

    render() {

        const fields = [
            { key: 'id', _style: { width: '5%' } },
            { key: 'Name', _style: { width: '20%' } },
            { key: 'No', _style: { width: '15%' } },
            { key: 'table_Status', _style: { width: '20%' } },
            { key: 'Remove', _style: { width: '5%' } },

        ]
        
        return (
            <DataConsumer>
                {({ Tables}) => (
                 <DataTable
                 fields={fields}
                 Data={Tables}
                 url={'table'}
                 />
                   
                )}
            </DataConsumer>
        );
    }

}
export default ViweTable