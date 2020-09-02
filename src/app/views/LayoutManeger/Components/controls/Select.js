import React from 'react'
import { FormControl, InputLabel, TextField as MuiSelect, MenuItem, FormHelperText   } from '@material-ui/core';

export default function Select(props) {

    const { name, label, value, error = null, onChange, options, optionsValue, optionsDisplay , size} = props;

    return (
        <FormControl variant="outlined"
            {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                size={size || 'small'}
                fullWidth
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item[optionsValue]}>{item[optionsDisplay]}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
