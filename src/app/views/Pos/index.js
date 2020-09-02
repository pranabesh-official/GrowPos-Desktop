import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import DataProvider from '../../LocalDB'
import { View } from 'react-desktop/macOs';
import OrderSource from './OrderSource/index'
import ClientProvider from '../../LocalDB/ClientDB'
import {ThemeBackground} from '../LayoutManeger/Themes'
class Pos extends Component {
    constructor(props) {
        super(props)
        this.updateDimensions = this.updateDimensions.bind(this);
        this.state = {
            width: 0,
            height: 0,
        };
    }

    render() {
        localStorage.setItem('lastPage', '/CategorySetup')
        const { height } = this.state
        const style = {
            background: ThemeBackground,
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            height: '100%',
            variant: "scrollable",
        }
        const panes = [
            {
                menuItem: 'Order',
                render: () => (
                    <Tab.Pane attached={false}>
                        <Grid container direction='column'>
                            <DataProvider>
                                <ClientProvider>
                                    <OrderSource />
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
                        <View padding="0px" margin="0px" width='100%' height={`${height - 68}px`}>
                            <Grid container direction="column" style={style}  >
                                <DataProvider>

                                </DataProvider>
                            </Grid>
                        </View>
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
export default connect(mapStateToProps)(Pos)