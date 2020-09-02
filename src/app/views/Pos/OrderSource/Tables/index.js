import React, { Component } from 'react';
import { ClientHandeler, ClientData } from '../../../../LocalDB/ClientDB'
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
            <ClientData>
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
            </ClientData >
        )
    }
}
Tables.contextType = ClientHandeler
export default Tables;
