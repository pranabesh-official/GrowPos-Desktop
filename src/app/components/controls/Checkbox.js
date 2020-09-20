import React from 'react'
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    heading: {
        fontSize: theme.typography.pxToRem(14),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(10),
    },
}));
export default function Checkbox(props) {
    const { name, label, value, onChange , disabled} = props;
    const classes = useStyles(props);

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
                label={<Typography variant='body1' className={classes.heading } >{label}</Typography>}
            />
        </FormControl>
    )
}
