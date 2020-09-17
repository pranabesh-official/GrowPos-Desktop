import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';

export default function RadioGroup(props) {
    let key = 0
    const { name, label, value, onChange, options, optionsValue, optionsDisplay , ...other } = props;
    const keygen = () => {
        key = key + 1
        return key
    }
    return (
        <FormControl size="small">
            <FormLabel  {...other} >{label}</FormLabel>
            <MuiRadioGroup 
                row
                name={name}
                value={value}
                onChange={onChange}
                {...other} >
                {
                    options.map(
                        item => (
                            <FormControlLabel key={keygen()} value={item[optionsValue]} control={<Radio />} label={item[optionsDisplay]} />
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}
