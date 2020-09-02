import React, { Component } from 'react';
import { CDataTable } from '@coreui/react'
import { IconButton } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { DataConsumer } from '../../../../LocalDB'
import Dot from '../../../LayoutManeger/statusDot'
import { connect } from 'react-redux'


class ViewCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    };
  }
  snogen() {
    this.setState({ count: this.state.count + 1 })
    return this.state.count
  }
  render() {
    const { currentTab  } = this.props.sync
    let fields
    if (currentTab === 'Addcategory') {
      
      fields = [
        { key: 'Sync', _style: { width: '5%', fontSize: '14px' } },
        { key: 'Name', _style: { width: '35%', fontSize: '14px' } },
        { key: 'Source', _style: { width: '35%', fontSize: '14px' } },
        { key: 'Type', _style: { width: '25%', fontSize: '14px' } },
        { key: 'Remove', _style: { width: '5%', fontSize: '14px' } }
      ]
    } if (currentTab === 'AddSource') {
      
      fields = [
        { key: 'Sync', _style: { width: '5%', fontSize: '14px' } },
        { key: 'Name', _style: { width: '35%', fontSize: '14px' } },
        { key: 'Address', _style: { width: '35%', fontSize: '14px' } },
        { key: 'Mobile', _style: { width: '25%', fontSize: '14px' } },
        { key: 'Remove', _style: { width: '5%', fontSize: '14px' } }
      ]
    }

    const category = () => {
      return (
            <DataConsumer>
              {({ Category , deleteItem}) => (
                <CDataTable
                  items={Category}
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
      )
    }
    const source = () => {
      return (
            <DataConsumer>
              {({ Source , deleteItem}) => (
                <CDataTable
                  items={Source}
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
      )
    }
    return (
      <>
        {currentTab === 'Addcategory' && category()}
        {currentTab === 'AddSource' && source()}
      </>
    );
  }

}
const mapStateToProps = (state) => {
  return {
      data: state.DataStore,
      sync: state.SyncData,
      Auth: state.Auth,
  }
}
export default connect(mapStateToProps)(ViewCategory)