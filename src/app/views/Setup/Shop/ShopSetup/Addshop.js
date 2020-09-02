import React, { Component } from 'react';
import { Grid } from '@material-ui/core'
import { Input, Select, Checkbox, Button } from '../../../LayoutManeger/FormManager'
import { connect } from 'react-redux'
import { DataContext } from '../../../../LocalDB'
class AddShop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: '',
            Type: '',
            Contact: '',
            About: '',
            Location: '',
            isBar: false,
        }
        this.handlesubmit = this.handlesubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handlesubmit() {
        const addData = () => {
            return new Promise((resolve, reject) => {
                let Bar = null
                if (this.state.Type === 'Resturant') {
                    Bar = this.state.isBar
                }
                let data = {
                    Name: this.state.Name,
                    Type: this.state.Type,
                    Contact: this.state.Contact || null,
                    About: this.state.About || null,
                    Location: this.state.Location || null,
                    Bar: Bar,
                    shopAdd: true
                }
                if (this.state.Type && this.state.Name) {
                    this.context.addItem('Shop', data).then((d) => {
                        resolve(d)
                    }).catch((err) => {
                        reject(err)
                    });
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
            isBar: false,
        });
    }
    render() {
        const { ShopType } = this.props.Shop
        return (
            <Grid container spacing={1} style={{ margin: 2, padding: 2, width: '500px' }}>
                <Grid item xs={5} sm={5} >
                    <Input
                        name="Name"
                        label="Shop Name"
                        type='text'
                        value={this.state.Name}
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={5} sm={5} >
                    <Select
                        label=" Shop Type"
                        name="Type"
                        value={this.state.Type}
                        options={ShopType}
                        optionsValue={'name'}
                        optionsDisplay={'name'}
                        onChange={this.handleChange}
                    />
                </Grid>
                <Grid item xs={2} sm={2} >
                    <Checkbox
                        label="Bar"
                        name="isBar"
                        disabled={this.state.Type === 'Resturant' ? false : true}
                        value={this.state.isBar}
                        onChange={this.handleChange}
                    />{this.state.Type === 'Resturant' ? 'Bar' : null}
                </Grid>
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
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Shop: state.Shop,
    }
}
AddShop.contextType = DataContext
export default connect(mapStateToProps)(AddShop);