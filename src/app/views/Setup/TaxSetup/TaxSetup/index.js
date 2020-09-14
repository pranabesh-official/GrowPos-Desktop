import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  Paper } from '@material-ui/core';
import useTable from '../../../LayoutManeger/Datatable'
const useStyles = makeStyles((theme) => ({

    CartBody: props => {
        return {
            borderRadius: 0,
            border: 0,
            padding: '0 0px',
            boxShadow: '0 0px 0px 0px ',
            background: 'white',
            overflow: 'auto',
            // height: `${props.height - 68}px`,
            maxHeight: `${props.height - 68}px`,
            width: '100%'
        }
    }

}));

const Taxes =(props) =>{
    const classes = useStyles(props);
    const {
        TblContainer,
        // TblHead,
        // TblPagination,
        // recordsAfterPagingAndSorting
    } = useTable();
    return (

        <Paper className={classes.CartBody} >
            <TblContainer>

            </TblContainer>
        </Paper>
    )
    
  
}

export default Taxes

