import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { connect } from 'react-redux'
// import { ThemeBackground } from '../LayoutManeger/Themes'
import { withStyles } from '@material-ui/core/styles';
import Status from "./Status"
import Setup from './Setup'

const style = (theme) => ({
    Body: {
        ...theme.GlobalBox,
        background: theme.palette.light.main,
        // overflow: 'auto',
        width: '100%'
    },

    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '40%',
        flexShrink: 0,
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0'
    },

});

class Dashbord extends Component {
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
            <Paper className={classes.Body} style={{ height: `${height}px`, maxHeight: `${height}px` }}>
                <Grid container direction='column' spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Status />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container>
                            <Setup height={height} />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

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

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(Dashbord))