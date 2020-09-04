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
        console.log(this.context)
        return (
            <DataConsumer>
                {({ Tables }) => (
                    Tables.map((item) => (
                        <Grid item xs={2} sm={2} key={item._id}>
                            <ClientButton
                                // onClick={this.handleReset}
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
