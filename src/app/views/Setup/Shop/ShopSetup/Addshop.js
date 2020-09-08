import React, { Component } from 'react';
import { Grid, Paper } from '@material-ui/core'
import { Input, Checkbox, Button, RadioGroup } from '../../../LayoutManeger/FormManager'
import { connect } from 'react-redux'
import { DataContext } from '../../../../LocalDB'
import { withStyles } from '@material-ui/core/styles';
const style = (theme) => ({
    Card: {
        borderRadius: 0,
        border: 0,
        padding: 5,
        boxShadow: '0 0px 0px 0px ',
        background: 'white',
        overflow: 'auto',
        width: 600,
        // height:
    },
    CardBody: {
        borderRadius: 0,
        border: 0,
        width: '100%',
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',
        background: 'white',
        // overflow: 'auto',
    },
    CardAction: {
        borderRadius: 0,
        border: 0,
        padding: '0 0px',
        boxShadow: '0 0px 0px 0px ',
        background: 'white',
        borderTop: '1px solid #f0f0f0'
    },

});
class AddShop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: '',
            Type: '',
            Contact: '',
            About: '',
            Location: '',
            Bar: false,
            Kitchen:false,
        }
        this.handlesubmit = this.handlesubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handlesubmit() {
        const addData = () => {
            return new Promise((resolve, reject) => {
                let ResturantType = null
                if(this.state.Type === 'Resturant'){
                    ResturantType = []
                    if(this.state.Bar){
                        ResturantType.push({name:'Bar', id: 1 })
                    }
                    if(this.state.Bar){
                        ResturantType.push({Kitchen:'Bar', id: 2 })
                    }
                }
                let data = {
                    Name: this.state.Name,
                    Type: this.state.Type,
                    Contact: this.state.Contact || null,
                    About: this.state.About || null,
                    Location: this.state.Location || null,
                    Bar: this.state.Bar,
                    Kitchen: this.state.Kitchen,
                    shopAdd: true,
                    ResturantType:ResturantType 
                }
                if(this.state.Type === 'Resturant'){
                    if (this.state.Type && this.state.Name) {
                        this.context.addItem('Shop', data).then((d) => {
                            resolve(d)
                        }).catch((err) => {
                            reject(err)
                        });
                    }
                }
            })
        }
        addData().then((d) => {
            this.props.handleClose()
        })
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleReset() {
        this.setState({
            Name: '',
            Type: '',
            Contact: '',
            About: '',
            Location: '',
            Bar: false,
            Kitchen:false,
        });
    }
    render() {
        const { ShopType } = this.props.Shop
        const { classes } = this.props;
        return (
            <Paper className={classes.Card} >
                <Grid container spacing={1} >
                    <Grid item xs={12} sm={12} >
                        <Paper className={classes.CardBody} >
                            <Grid container spacing={1} >
                                <Grid item xs={6} sm={6} >
                                    <Grid container spacing={1} >
                                        <Grid item xs={12} sm={12} >
                                            <Input
                                                name="Name"
                                                label="Shop Name"
                                                type='text'
                                                value={this.state.Name}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} >
                                            <RadioGroup
                                                name="Type"
                                                value={this.state.Type}
                                                options={ShopType}
                                                optionsValue={'name'}
                                                optionsDisplay={'name'}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} sm={6} >
                                    <Grid container spacing={1} >
                                    <Grid item xs={12} sm={12} style={{borderLeft: '1px solid #f0f0f0'}}>
                                            <Checkbox
                                                label="Kitchen"
                                                name="Kitchen"
                                                disabled={this.state.Type === 'Resturant' ? false : true}
                                                value={this.state.Kitchen}
                                                onChange={this.handleChange}
                                            />Kitchen
                                        </Grid>
                                        <Grid item xs={12} sm={12} >
                                            <Checkbox
                                                label="Bar"
                                                name="Bar"
                                                disabled={this.state.Type === 'Resturant' ? false : true}
                                                value={this.state.Bar}
                                                onChange={this.handleChange}
                                            />Bar
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} >
                                    <Grid container spacing={1} >
                                        <Grid item xs={6} sm={6} >
                                            <Input
                                                name="Contact"
                                                label="Contact"
                                                type='text'
                                                value={this.state.Contact}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={6} >
                                            <Input
                                                name="Location"
                                                label="Location"
                                                type='text'
                                                value={this.state.Location}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} >
                                            <Input
                                                name="About"
                                                label="About"
                                                type='text'
                                                value={this.state.About}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <Paper className={classes.CardAction}>
                            <div>
                                <Button
                                    type="submit"
                                    text="Submit"
                                    onClick={this.handlesubmit}
                                />
                                <Button
                                    text="Reset"
                                    color="default"
                                    onClick={this.handleReset}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Shop: state.Shop,
    }
}
AddShop.contextType = DataContext
export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(AddShop));