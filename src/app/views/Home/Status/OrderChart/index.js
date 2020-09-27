import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';//InputAdornment
import { DataContext } from '../../../../LocalDB'
import {
    Chart,
    PieSeries,
    Tooltip,
    Legend
} from '@devexpress/dx-react-chart-material-ui';
import { HoverState } from '@devexpress/dx-react-chart';
import { Animation } from '@devexpress/dx-react-chart';
import { number } from 'prop-types';

const useStyles = makeStyles((theme) => ({

    Body: props => {
        return {
            ...theme.GlobalBox,
            overflow: 'auto',
            height: `${220}px`,

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
const OrderChart = (props) => {
    const initdata = [
        { region: `Table `, val: 0, name: 'Table' },
        { region: "Take Away", val: 0, name: '"TakeAway"' },
    ];
    const classes = useStyles(props);
    const [data, setData] = useState(initdata)
    const { SellReport } = useContext(DataContext)
    const updateObject = (oldObject, newValues) => {
        return Object.assign({}, oldObject, newValues)
    }

    const cartItemInArray = (array, itemId, updateItemCallback) => {
        const updatedItems = array.map(item => {
            if (item._id !== itemId._id) {
                return item
            }
            const updatedItem = updateItemCallback(item)
            return updatedItem
        })
        return updatedItems
    }
    useEffect(() => {
        const filterTable = SellReport.filter(item => item.OrderType === "TakeAway")
        let updatedData =data
        let uptateTime = 0
        if (filterTable.length !== 0) {
            uptateTime = uptateTime +1
            let val = 0
            filterTable.forEach(element => {
                val = val + element.SubTotal
                const oldobj = { region: `Table `, val: 0, name: 'Table' }
                updatedData = cartItemInArray(data, oldobj, addot => {
                    return updateObject(addot, addot.val = addot.val + 1)
                })
                
            });
        }
        if(filterTable.length !== 0 && filterTable.length !== uptateTime){
            setData(updatedData)
        }
        
    }, [SellReport, data])
    console.log(data)
    return (
        <Paper className={classes.Body} >
            <Chart
                height={200}
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
    )
}

// position='top'

export default OrderChart