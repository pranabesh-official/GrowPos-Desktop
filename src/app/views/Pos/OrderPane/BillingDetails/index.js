import React, { useContext } from 'react';
import { Input, Checkbox} from '../../../LayoutManeger/FormManager' // RadioGroup
import { Grid } from '@material-ui/core';
import { ClientHandeler, ClientData } from '../../../../LocalDB/ClientDB'
export const TableBilling = (props) => {
   
    const client = useContext(ClientHandeler)
    console.log(client)
    return (
        <ClientData>
            {({ billDetails, Mobile, Name, Discount, free, discount, Percent }) => (
                <Grid container spacing={1} style={{ padding: 5 }}>
                    <Grid item xs={6} sm={6} >
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} >
                                <Input
                                    name='Mobile'
                                    label='Customer Mobile'
                                    type='number'
                                    value={Mobile}
                                    onChange={(value) => billDetails(value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} >
                                <Input
                                    name='Name'
                                    label='Customer Name'
                                    type='text'
                                    value={Name}
                                    onChange={(value) => billDetails(value)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={6} style={{ borderLeft: '1px solid #f0f0f0' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} sm={6} >
                                <Checkbox
                                    name="free"
                                    value={free}
                                    onChange={(value) => billDetails(value)}
                                />Free
                            </Grid>
                            <Grid item xs={6} sm={6} >
                                <Checkbox
                                    name="discount"
                                    value={discount}
                                    onChange={(value) => billDetails(value)}
                                />Add Discount
                            </Grid>
                            <Grid item xs={6} sm={6} style={{ borderTop: '1px solid #f0f0f0' }}>
                                <Input
                                    name='Discount'
                                    label={Percent ? 'Percent':'Amount' }
                                    type='number'
                                    disabled={discount? false : true}
                                    value={Discount}
                                    onChange={(value) => billDetails(value)}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} style={{ borderTop: '1px solid #f0f0f0' }} >
                                <Checkbox
                                    name="Percent"
                                    value={Percent}
                                    disabled={discount? false : true}
                                    onChange={(value) => billDetails(value)}
                                />Percent
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </ClientData>
    )
}