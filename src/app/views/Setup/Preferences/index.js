import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import DataProvider from '../../../LocalDB'
import { IconButton } from '@material-ui/core'
import {SettingsApplications} from '@material-ui/icons';
import ShopProvider from '../../../LocalDB/ShopDB'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Setup from './Setup'

const style = (theme) => ({
    Body: {
        ...theme.GlobalBox,
        background: '#00000000',
        backgroundColor:'#00000000',
        padding: 5,
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
    titleIcon: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
            cursor: 'default'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '8rem',
        }
    },
    root: {
        padding: theme.spacing(2),
        borderRadius: 0,
        border: 0,
        boxShadow: '0 0px 0px 0px ',
        height: '100%',
        width: '100%',
        borderTop: '1px solid #f0f0f0',
        background: '#00000000',
        backgroundColor:'#00000000',
    },
    Title: {
        textAlign: 'center'
    },
    Content: {
        textAlign: 'center'
    },

});
class Preferences extends Component {
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
        const { classes } = this.props;
        return (
            <Grid container spacing={3} style={{ padding: '5px' }}>
                <Grid item xs={12} sm={5} id='FormCategory' style={{ height: `${height - 10}px` }}>
                    <Paper className={classes.root}>
                        <div className={classes.Title}>
                            <IconButton disableRipple className={classes.titleIcon}  >
                                <SettingsApplications />
                            </IconButton>
                        </div>
                        <div className={classes.Content}>
                            <Typography variant="h6">
                                Setup Your Recipt printer
                            </Typography>
                            <Typography variant="body2" display="inline">
                                This Set Up Only  for Desktop App
                            </Typography>
                        </div>
                    </Paper>

                </Grid>
                <Grid item xs={12} sm={7} id='ViewCategory' style={{ height: `${height - 10}px` }}>
                    <Paper className={classes.Body} style={{ height: `${height - 10}px` }}>
                        <DataProvider>
                            <ShopProvider>
                                <Setup height={height} />
                            </ShopProvider>
                        </DataProvider>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
    updateDimensions = () => {
        return new Promise((resolve, reject) => {
            this.setState({
                width: document.getElementById('Content').clientWidth,
                height: document.getElementById('Content').clientHeight
            })

        })
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

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(Preferences))
