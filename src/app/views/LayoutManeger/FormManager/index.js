import React from 'react'
import {
    TextField,
    Button as MuiButton,
    MenuItem,
    Checkbox as MuiCheckbox,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"
import DateFnsUtils from '@date-io/date-fns';
import { danger, secondary,primary, success, info,  warning, light, dark } from '../Themes'
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const setColor = (color) => {
    switch (color) {
        case 'primary': return primary
        case 'success': return success
        case 'secondary': return secondary
        case 'warning': return warning
        case 'danger': return danger
        case 'info': return info
        case 'dark': return dark
        default: return light
    }
}
const useStyles = makeStyles(theme => ({
    button: props => {
        return {
            margin: theme.spacing(0.5),
            background: setColor(props.color),
            "&:hover": {
                backgroundColor: setColor(props.color),
    
                "@media (hover: none)": {
                    backgroundColor: setColor(props.color)
                }
            }

        }
    },
    label: {
        textTransform: 'none'
    },
    Checkbox: props => {
        return {
            color: setColor(props.color) || dark
        }
    },
    Radio: props => {
        return {
            color: dark
        }
    },
}))
export const Input = (props) => {
    const { name, label, value, error = null, onChange, size, type, disabled } = props;
    return (
        <TextField
            variant="outlined"
            disabled={disabled}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            size={size || 'small'}
            type={type || 'text'}
            fullWidth
            error={error}
        />
    )
}


export const Button = (props) => {
    const { text, size, variant, onClick, ...other } = props
    const classes = useStyles(props);
    return (
        <MuiButton
            variant={variant || "contained"}
            size={size || "small"}
            onClick={onClick}
            {...other}
            className={classes.button}
            classes={{label: classes.label }}>
            {text}
        </MuiButton>
    )
}
export const Select = (props) => {
    const { name, label, value, error = null, onChange, options, optionsValue, optionsDisplay, size, disabled } = props;
    let key = 0
    const keygen = () => {
        key = key + 1
        return key
    }
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            size={size || 'small'}
            select
            disabled={disabled}
            fullWidth
            value={value}
            onChange={onChange}
            error={error}>
            <MenuItem value="">None</MenuItem>
            {
                options.map(
                    item => (<MenuItem key={keygen()} value={item[optionsValue]}>{item[optionsDisplay]}</MenuItem>)
                )
            }
        </TextField>
    )
}

export const RadioGroup = (props) =>{
    const classes = useStyles(props);
    let key = 0
    const { name, label, value, onChange, options, optionsValue, optionsDisplay } = props;
    const keygen = () => {
        key = key + 1
        return key
    }
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row
                name={name}
                value={value}
                className={classes.Radio} 
                onChange={onChange}>
                {
                    options.map(
                        item => (
                            <FormControlLabel key={keygen()} value={item[optionsValue]} control={<Radio className={classes.Radio} />} label={item[optionsDisplay]}/>
                        )
                    )
                }
            </MuiRadioGroup>
        </FormControl>
    )
}
export const Checkbox = (props) => {
    const classes = useStyles(props);
    const { name, value, onChange, disabled, label } = props;
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })
    return (
        <MuiCheckbox
            name={name}
            label={label}
            disabled={disabled}
            checked={value}
            className={classes.Checkbox}
            onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
        />

    )
}

export function DatePicker(props) {
    const { name, label, value, onChange, size, disabled } = props
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="MMM/dd/yyyy"
                size={size || 'small'}
                disabled={disabled}
                name={name}
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}
            />
        </MuiPickersUtilsProvider>
    )
}