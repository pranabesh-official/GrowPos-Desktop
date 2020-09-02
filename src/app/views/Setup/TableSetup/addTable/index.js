import React, { Component } from 'react';
import { Input, Button } from '../../../LayoutManeger/FormManager'
import Grid from '@material-ui/core/Grid';
import { Chip } from '@material-ui/core';
import { DataContext } from '../../../../LocalDB'

class AddTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            No: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    componentDidMount() {
    }
    handleReset() {
        this.setState({
            No: '',
        });
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handlesubmit() {
        const { No } = this.state
        const data = {
            No: No,
            table_Status: 'Inactive'
        }
        if (No) {
            this.context.handlesubmit('Tables', data)
        }
    };
    render() {
        const { No } = this.state
        var nikename = false
        if(No){
            nikename = true
        }
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    {nikename &&
                        <Chip
                            variant="outlined"
                            size="small"
                            label={`TABLE-${No}`}
                            clickable
                            style={{ marginBottom: '5px' }}
                        />
                    }
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Input
                        name="No"
                        label="Add Table NO"
                        type="number"
                        value={No}
                        onChange={this.handleChange}
                    />
                </Grid>
                <div>
                    <Button
                        type="submit"
                        text="Submit"
                        color="primary"
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

AddTable.contextType = DataContext

export default AddTable 