import React from 'react'
import {  TextField as MuiSelect, MenuItem,  } from '@material-ui/core';

export default function Select(props) {

    const { name, label, value, error=null,  onChange, options, optionsValue, optionsDisplay, ...other } = props;

    return (


        <MuiSelect
            label={label}
            name={name}
            value={value}
            select
            variant="outlined"
            onChange={onChange}
            
            {...other}
            {...(error && {error:true,helperText:error})}
        >
            <MenuItem value="">None</MenuItem>
            {
                options.map(
                    item => (<MenuItem key={item._id} value={item[optionsValue]}>{item[optionsDisplay]}</MenuItem>)
                )
            }
        </MuiSelect>

    )
}
