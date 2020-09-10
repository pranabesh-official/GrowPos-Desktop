import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux'
import { ThemeBackground } from '../LayoutManeger/Themes'
import StyledRipple from '../LayoutManeger/Ripple/Ripple'
import { withStyles } from '@material-ui/core/styles';


const style = (theme) => ({
    CartBody: {
        borderRadius: 0,
        border: 0,
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',
        // background: 'white',
        // overflow: 'auto',
        width: '100%',
        background: ThemeBackground,
    },
    Content: {
        borderRadius: 0,
        border: 0,
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',
        background: ThemeBackground,
        height:'100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Grid: {
        justifyContent: 'center',
    },

});

class Home extends Component {
    constructor(props) {
        super(props)
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.state = {
            width: 0,
            height: 0,
            activeIndex: 0,
            current: null
        };
    }
    handleTabChange(activeIndex, current) {
        this.setState({ activeIndex, current })
    }
    render() {
        const { height } = this.state
        const { classes } = this.props;
        

        return (
            <>
                <Paper className={classes.CartBody} style={{ height: height, maxHeight: height }}>
                    <Grid container spacing={1} >
                        <Grid item xs={12} sm={12} >
                            <Paper className={classes.Content} style={{ height: height, maxHeight: height }}>
                                <StyledRipple />
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </>
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

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(Home))