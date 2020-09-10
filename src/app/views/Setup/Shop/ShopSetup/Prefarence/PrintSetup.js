import React, { Component } from 'react';
import { RadioGroup, Button, Input, Checkbox, Select } from '../../../../LayoutManeger/FormManager'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { DataContext, DataConsumer } from '../../../../../LocalDB'
import { Paper, Typography } from '@material-ui/core';
import { connect } from 'react-redux'
import SelectPrinter from './SelectPrinter'



const style = theme => ({
    CardBody: {
        borderRadius: 0,
        border: 0,
        padding: '0 0px',
        width: '100%',
        height: 100,
        boxShadow: '0 0px 0px 0px ',
        background: 'white',
        overflow: 'auto',
    },

});
class PrintSetup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            preview: true,
            silent: false,
            width: '',
            margin: '',
            copies: 1,
            timeOutPerLine: 400,
            Type: '',
            PrinterName: '',
            option: [
                { name: 'Kot', id: '1', value: 'KOT' },
                { name: 'Bill', id: '2', value: 'BILL' }
            ],
            Error: null,
            Source_id:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.getPrinter = this.getPrinter.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    componentDidMount() {

    }
    handleReset() {
        this.setState({
            preview: true,
            silent: false,
            timeOutPerLine: 400,
            margin: '',
            copies: 1,
            Type: '',
            printerName: '',
            option: [
                { name: 'Kot', id: '1', value: 'KOT' },
                { name: 'Bill', id: '2', value: 'BILL' }
            ],
            Error: null
        });

    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    getPrinter(name) {

        if (name.length === 1) {
            const [Name] = name
            this.setState({ printerName: Name, Error: null })
        } else {
            this.setState({ Error: 'Please Select Any One Printer' })
        }

    }
    handlesubmit() {
        const { Source } = this.context
        if (this.state.Type && this.state.printerName && this.state.Source_id) {
            const [filter] = Source.filter(item => item._id === this.state.Source_id)
            const data = {
                Name: this.state.Type,
                printFor: filter.Name,
                printForId:filter._id,
                preview: this.state.preview,
                silent: this.state.silent,
                copies: this.state.copies || 1,
                printerName: this.state.printerName || null,
                timeOutPerLine: this.state.timeOutPerLine || 400
            }
            this.context.addItem('Print', data).then(() => {
                this.handleReset()
            })
        }

    };
    handleEdit(id) {
        const { Source } = this.context
        if (this.state.Type && this.state.printerName && this.state.Source_id) {
            const [filter] = Source.filter(item => item._id === this.state.Source_id)
            const data = {
                Name: this.state.Type,
                printFor: filter.Name,
                printForId:filter._id,
                preview: this.state.preview,
                silent: this.state.silent,
                copies: this.state.copies || 1,
                printerName: this.state.printerName || null,
                timeOutPerLine: this.state.timeOutPerLine || 400
            }
            this.context.editItem(id, data)
            this.handleReset()
        }

    };

    render() {
        const { classes } = this.props;
        const { printSetups } = this.props.Shop
        const [filter] = printSetups.filter(item => item.Name === this.state.Type)
        const Setup = () => {
            if (filter) {
                return true
            } else {
                return false
            }
        }
        return (
            <DataConsumer>
                {({ Source, deletetem }) => (
                    <>
                        <Grid container spacing={1}>
                            {this.state.Error &&
                                <Grid item xs={12} sm={12}>
                                    <Typography color='error'>{this.state.Error}</Typography>
                                </Grid>
                            }
                            <Grid item xs={6} sm={6} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Select
                                    label="Select Source"
                                    name="Source_id"
                                    value={this.state.Source_id}
                                    options={Source}
                                    optionsValue={'_id'}
                                    optionsDisplay={'Name'}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <RadioGroup
                                    name="Type"
                                    value={this.state.Type}
                                    options={this.state.option}
                                    optionsValue={'value'}
                                    optionsDisplay={'name'}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={6} sm={6}>
                                        <Input
                                            name="copies"
                                            label="copies"
                                            type='number'
                                            value={this.state.copies}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <Input
                                            name="timeOutPerLine"
                                            label="timeOut"
                                            type='number'
                                            value={this.state.timeOutPerLine}
                                            onChange={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <Checkbox
                                            name="preview"
                                            value={this.state.preview}
                                            onChange={this.handleChange}
                                        />Preview
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <Checkbox
                                            name="silent"
                                            value={this.state.silent}
                                            onChange={this.handleChange}
                                        />Silent
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} sm={6} style={{ borderLeft: '1px solid #f0f0f0' }}>
                                <Paper className={classes.CardBody}>
                                    <SelectPrinter getPrinter={this.getPrinter} />
                                </Paper>
                            </Grid>
                            <div>
                                {Setup() ?
                                    <Button
                                        type="submit"
                                        text="Set"
                                        color="primary"
                                        onClick={() => this.handleEdit(filter._id)}
                                    />
                                    :
                                    <Button
                                        type="submit"
                                        text="New Setup"
                                        color="primary"
                                        onClick={this.handlesubmit}
                                    />
                                }
                                {Setup() ?
                                    <Button
                                        type="submit"
                                        text="Delete"

                                        onClick={() => deletetem(filter._id)}
                                    />
                                    :
                                    <Button
                                        text="Reset"
                                        color="default"
                                        onClick={this.handleReset}
                                    />
                                }

                            </div>
                        </Grid>
                    </>
                )}
            </DataConsumer>
        )
    }
}

PrintSetup.contextType = DataContext


const mapStateToProps = (state) => {
    return {
        Shop: state.Shop
    }
}

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(PrintSetup))
