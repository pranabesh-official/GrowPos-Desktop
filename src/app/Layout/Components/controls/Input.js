import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value,error=null, onChange , size , type} = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            size={size || 'small'}
            type={type}
            fullWidth
            {...(error && {error:true,helperText:error})}
        />
    )
}
