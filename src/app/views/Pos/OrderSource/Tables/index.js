import React, { Component } from 'react';
import { DataConsumer, DataContext} from '../../../../LocalDB'
import ClientButton from '../../../LayoutManeger/ClientButton'
import { Grid } from '@material-ui/core';


class Tables extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const {handleTabChange}=this.props.props
        return (
            <DataConsumer>
                {({ Tables }) => (
                    Tables.map((item) => (
                        <Grid item xs={3} sm={3} md={2} lg={1} xl={1} key={item._id}>
                            <ClientButton
                                onClick={()=>handleTabChange(1,item)}
                                label={`TABLE ${item.No}`}
                                status={item.table_Status}
                                Type='Table'
                                size={110}
                                key={item._id}
                            />
                        </Grid>
                    ))
                )}
            </DataConsumer >
        )
    }
}
Tables.contextType = DataContext
export default Tables;
