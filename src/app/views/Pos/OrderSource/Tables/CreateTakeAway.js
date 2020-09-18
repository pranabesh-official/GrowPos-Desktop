import React, { useContext } from 'react'
import { DataContext } from '../../../../LocalDB' //DataContext
import ClientButton from '../../../../components/ClientButton'
import { Grid } from '@material-ui/core';



const CreateTakeAway = (props) => {
    const generator = require('generate-serial-number')
    const { addItem } = useContext(DataContext)
    const initialFValues = {
        No: '#'+ generator.generate(6),
        table_Status: 'Inactive',
        Type: 'TakeAway'
    }

    const handleSubmit = e => {
        addItem('Tables', initialFValues).then((d)=>{
            
            const Active = {
                ClientId: d._id,
                Cart: [],
                Ot: [],
                OTPrint: 0,
                OTSno: null,
                Type:'TakeAway'
            }
            console.log(d , Active)
            addItem('Cart', Active).then(()=>{console.log('Sucsess')})
        })
    }

    return (
        <Grid item xs={3} sm={3} md={2}>
            <ClientButton
                onClick={() => handleSubmit()}
                label={`Add New`}
                Type='TakeAway'
                size={110}
                amount={'addNew'}
                add={true}
            />
        </Grid>
    )
}



export default CreateTakeAway 