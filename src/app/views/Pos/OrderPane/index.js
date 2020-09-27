import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import General from './BillingDetails/General'
import Items from './Items'
import Controls from '../../../components/controls/Controls'
import { Search } from "@material-ui/icons";
import { InputAdornment, Paper } from '@material-ui/core';
import Delivery from './BillingDetails/Delivery'

const AntTabs = withStyles((theme) => ({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: theme.palette.primary.main,
    },
}))(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: theme.palette.primary.main,
            opacity: 1,
        },
        '&$selected': {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: theme.palette.primary.main,
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);


const useStyles = makeStyles((theme) => ({
    root: (props) => {
        return {
            ...theme.GlobalBox,
            height: `${props.height - 68}px`,
            width: '100%',
            padding: '0 0px',
            background: '#00000000',
            paddingRight: 5,
        }
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    Accordion: {
        height: 147,
        maxHeight: 147,
        padding:8,
        boxShadow: '0 0px 0px 0px ',
    },
    Card: {
        ...theme.GlobalBox,
        width: '100%',
        padding: '0 0px',
        marginBottom: 10
    },
    keyBordOrder: {
        height: 62,
        boxShadow: '0 0px 0px 0px ',
    },
    searchInput: {
        position: 'absolute',
        left: '10px',
        margin: '4px',
    },
    resize: {
        height: 27,
        fontSize: 11,
        padding: '0 0px 0px 0px '
    },
    addCart: (props) => {
        return {
            ...theme.GlobalBox,
            padding: '0 0px',
            height: `${props.height - 300}px`,
            borderTop: '1px solid #f0f0f0',
        }
    },
    body: {
        ...theme.GlobalBox,
        borderTop: '1px solid #f0f0f0',
        height: '120px',
        width: '100%',
        padding: '0 0px',
    },
    Products: (props) => {
        return {
            ...theme.GlobalBox,
            height: `${props.height - 238}px`,
            width: '100%',
            padding: '0 0px',
            background: 'white',
            borderTop: `1px solid ${theme.palette.divider}`,
        }
    },

    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '40%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    Tab: {
        flexGrow: 1,
        // marginBottom: 10
    },
    padding: {
        padding: theme.spacing(3),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },

}));



function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box >
                    {children}
                </Box>
            )
            }
        </div >
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
const OrderPane = (props) => {
    const [values, setValues] = React.useState('');
    const classes = useStyles(props);
    const handleInputChange = e => {
        const { value } = e.target
        setValues(value)
    }
    const [tab, setTab] = React.useState(0);
    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <Card className={classes.root}>
            <div className={classes.Tab}>
                <div className={classes.demo1}>
                    <AntTabs value={tab} onChange={handleChange} aria-label="ant example">
                        <AntTab label=" General" {...a11yProps(0)} />
                        <AntTab label=" Delivery" {...a11yProps(1)} />
                    </AntTabs>
                </div>
                <TabPanel value={tab} index={0} >
                    <Paper className={classes.Accordion}>
                       <General/>
                    </Paper>
                </TabPanel>
                <TabPanel value={tab} index={1} >
                    <Paper className={classes.Accordion}>
                        <Delivery/>
                    </Paper>
                </TabPanel>
            </div>
            <Card className={classes.Products}>
                <CardActions className={classes.keyBordOrder}>
                    <Controls.Input
                        label={'Search By Name'}
                        type="text"
                        className={classes.searchInput}
                        size="small"
                        InputProps={{
                            classes: { input: classes.resize },
                            startAdornment: (<InputAdornment position="start" size="small" style={{ padding: 2 }}>
                                <Search fontSize="inherit" />
                            </InputAdornment>)
                        }}
                        onChange={handleInputChange}
                    />
                </CardActions>
                <CardContent className={classes.addCart} >
                    <Items height={props.height - 300} SearchName={values} />
                </CardContent>
            </Card>
        </Card>
    );
}



export default OrderPane;
