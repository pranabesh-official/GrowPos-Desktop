import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import DataProvider from '../../LocalDB'
import CartItem from './Cart/cartItem'
import OrderSource from './OrderSource/index'
import ClientProvider from '../../LocalDB/ClientDB'
import { ThemeBackground } from '../LayoutManeger/Themes'
import OrderPane from './OrderPane'
import { withStyles } from '@material-ui/core/styles';
import Header from '../LayoutManeger/header'
import tables from '../LayoutManeger/icons/dinner.png'
const style = (theme) => ({
    CartBody: {
        borderRadius: 0,
        border: 0,
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',
        background: 'white',
        overflow: 'auto',
    },
    CartTitel: {
        borderRadius: 0,
        border: 0,
        height: '40px',
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',
        background: 'white',
        overflow: 'auto',
        borderBottom: '1px solid #f0f0f0'
    },
    CartAction: {
        borderRadius: 0,
        border: 0,
        height: '60px',
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',
        background: 'white',
        overflow: 'auto',
        borderTop: '1px solid #f0f0f0'
    },

});

class Pos extends Component {
    constructor(props) {
        super(props)
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.state = {
            width: 0,
            height: 0,
            activeIndex: 0 ,
            current:null
        };
    }
    handleTabChange (activeIndex, current){
        this.setState({activeIndex , current})
    }
    render() {
        const { height , activeIndex } = this.state
        const { classes } = this.props;
        const style = {
            background: ThemeBackground,
        }
        const panes = [
            {
                menuItem: 'Order',
                render: () => (
                    <Tab.Pane attached={false}>
                        <Grid container direction='column'>
                            <DataProvider>
                                <ClientProvider>
                                    <OrderSource height={height} handleTabChange={this.handleTabChange} />
                                </ClientProvider>
                            </DataProvider>
                        </Grid>
                    </Tab.Pane>
                )
            },
            {
                menuItem: 'Current',
                render: () => (
                    <Tab.Pane attached={false} active={true} style={{ padding: '0px' }}>
                        <Grid container style={style} >
                            <Grid item xs={12} sm={7}>
                                <OrderPane height={height} />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <Header
                                height={40}
                                title={`Order for ${this.state.current.dbName}`}
                                subtitle={`No ${this.state.current.No}`}
                                src={tables}
                                />
                                <Paper className={classes.CartBody} style={{ height: `${(height - 68) - 100}px`, maxHeight: `${(height - 68) - 100}px` }}>
                                    <CartItem/>
                                </Paper>
                                <Paper className={classes.CartAction} >
                                </Paper>
                            </Grid>
                        </Grid>
                    </Tab.Pane>
                )
            }
        ]

        return (
            <Grid container spacing={1} style={{ padding: '5px' }}>
                <Grid item xs={12} sm={12} >
                    <Tab
                        menu={{ borderless: true, attached: false, tabular: false, }}
                        panes={panes}
                        activeIndex={activeIndex}
                        onTabChange={()=>this.handleTabChange(0,null)}
                    />
                </Grid>
            </Grid>
        );
    }

    updateDimensions = () => {
        this.setState({ width: document.getElementById('Content').clientWidth, height: document.getElementById('Content').clientHeight });
    };
    componentDidMount() {
        if (this.state.width !== document.getElementById('Content').clientWidth) {
            this.updateDimensions()
        }
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

}
const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(Pos))