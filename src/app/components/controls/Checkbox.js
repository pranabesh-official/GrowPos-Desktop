import React from 'react'
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';

export default function Checkbox(props) {

    const { name, label, value, onChange , disabled} = props;


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    disabled={disabled}
                    checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                />}
                label={label}
            />
        </FormControl>
    )
}
