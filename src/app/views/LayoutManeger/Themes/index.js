// import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

export const ThemeLite = '#3c4b64'
export const ThemeDark = '#2a3446'
export const ThemeBackground = '#f0f0f0'
export const ThemeItem = '#321fdb'

export const secondary = '#ced2d8'
export const primary = '#321fdb'
export const success = '#21ba45'
export const info = '#39f'
export const danger = '#db2828'
export const light = '#ebedef'
export const dark = '#636f83'
export const warning = '#f9b115'

export const themeColor = createMuiTheme({
    status: {
        danger: danger,
    },
    palette: {
        primary: {
            main: primary,
        },
        secondary: {
            main: light,
        },
        danger: {
            main: danger,
        },
    },
    shape: {
        borderRadius: 0
    }
});
