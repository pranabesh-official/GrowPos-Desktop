import React, { Component } from 'react';
import { CDataTable, CBadge } from '@coreui/react'
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// import dataUrl from '../dataUrl'
// import Dot from '../statusDot'
class DataTable extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }
    render() {
        const { fields, Data } = this.props
        const getBadge = (status) => {
            switch (status) {
                case 'Active': return 'success'
                case 'Inactive': return 'secondary'
                case 'Pending': return 'warning'
                case 'Banned': return 'danger'
                default: return 'primary'
            }
        }
        let no = 0
        
        return (
            <CDataTable
                items={Data}
                fields={fields}
                columnFilter
                sorter
                style={{ height: '100%', width: '100%', }}
                scopedSlots={{
                    'SNo':
                        (item) => (
                            <td>
                                {snogen()}
                                {/* item.id === null ? <Dot color={'Red'} position="flex-start" mx={8} /> : item.id */}
                            </td>
                        ),
                    'table_Status':
                        (item) => (
                            <td>
                                <CBadge color={getBadge(item.table_Status)}>
                                    {item.table_Status}
                                </CBadge>
                            </td>
                        ),
                    'Remove':
                        (item, index) => {
                            return (
                                <td className="py-2">
                                    <IconButton
                                        aria-label="delete"
                                        color="secondary"
                                        size="small" onClick={() => this.props.remove(item._id)}
                                        style={{ justifyContent:'space-around' }}
                                    >
                                        <DeleteForeverIcon fontSize="inherit" className="mx-3" />
                                    </IconButton>
                                </td>
                            )
                        },
                }}
            />
        );
    }

}


export default DataTable