import React, { Component } from 'react';
import { DataConsumer, DataContext} from '../../../../LocalDB'
import ClientButton from '../../../LayoutManeger/ClientButton'
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import { SelectClient} from '../../../../store/action/Cart'


class Tables extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    selectTable(table){
        const {handleTabChange}=this.props.props
        handleTabChange(1,table)
        this.props.SelectClient(table)
    }
    render() {
        const {Tables} = this.context
        let sortItem =[]
        if(this.props.Status){
            const StatusShort = Tables.filter(item => item.table_Status === this.props.Status)
            sortItem = StatusShort.sort((a, b) => a.No - b.No)
        }else{
            sortItem = Tables.sort((a, b) => a.No - b.No)
        }
        return (
            <DataConsumer>
                {() => (
                    sortItem.map((item) => (
                        <Grid item xs={3} sm={3} md={2}  key={item._id}>
                            <ClientButton
                                onClick={()=>this.selectTable(item)}
                                label={`TABLE ${item.No}`}
                                status={item.table_Status}
                                Type='Table'
                                size={110}
                                amount={560.00}
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

const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps ,{SelectClient})(Tables) ;
