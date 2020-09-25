import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';//InputAdornment
import {
    Chart,
    PieSeries,
    Tooltip,
    Legend
} from '@devexpress/dx-react-chart-material-ui';
import {  HoverState } from '@devexpress/dx-react-chart';
import { Animation } from '@devexpress/dx-react-chart';
const data = [
    { region: 'Asia', val: 10, name: 'test1' },
    { region: 'Africa', val: 20, name: 'test2' },
    { region: 'Northern America', val: 30, name: 'test3' },
    { region: 'Latin America ', val: 40, name: 'test4' },
    { region: 'Europe', val: 50, name: 'test5' },
    { region: 'Oceania', val: 60, name: 'test6' },
];
const useStyles = makeStyles((theme) => ({
    Header: props => {
        return {
            ...theme.GlobalBox,
            border: 0,
            padding: 8,
            height: `${48}px`,
            // width: '100%',
            // borderBottom: '1px solid #f0f0f0'
        }
    },
    Body: props => {
        return {
            ...theme.GlobalBox,
            overflow: 'auto',
            height: `${(props.height - 240) - 100}px`,

        }
    },
    Footer: props => {
        return {
            ...theme.GlobalBox,
            padding: 0,
            // width: '100%',
            height: `${52}px`,
            borderTop: '1px solid #f0f0f0'
        }
    },
    searchInput: {
        margin: '4px',
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    resize: {
        height: 27,
        fontSize: 11,
        padding: '0 0px 0px 0px '
    },
    CellContentent: {
        textAlign: 'center',
        justifyContent: 'center'
    }
}));
const SellChart = (props) => {
    const classes = useStyles(props);
    return (
        <>
            <Paper className={classes.Header} >

            </Paper>
            <Paper className={classes.Body} >
                <Chart
                    height={(props.height - 240) - 110}
                    data={data}

                >
                    <PieSeries
                        name='name'
                        // scaleName='name'
                        valueField="val"
                        argumentField="region"
                        innerRadius={0.6}
                    />
                
                    <Animation />
                    <Tooltip />
                    <Legend />
                    <HoverState />
                </Chart>
            </Paper>
            <Paper className={classes.Footer} >

            </Paper>
        </>
    )
}

// position='top'

export default SellChart