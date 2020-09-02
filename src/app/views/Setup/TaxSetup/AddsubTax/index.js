import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


class AddsubTax extends Component {

  constructor(props) {

    super(props)

    this.state = {
      TaxName: '',
      TaxPercent: '',
      options: [],
      MainTax: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
  }
  componentDidMount() {
   
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handlesubmit() {
  
  };
  render() {
    const { TaxName, TaxPercent , MainTax } = this.state
  
    return (
      <Card variant="outlined" >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="Tax-Name"
                name="TaxName"
                label="Tax Name"
                type="name"
                fullWidth
                autoComplete="given-name"
                variant="outlined"
                size='small'
                value={TaxName}
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={7} md={7}>
              <TextField id="MainTax"
                label="Select Main Tax"
                name="MainTax"
                type='text'
                select
                value={MainTax}
                size='small' fullWidth
                variant="outlined"
                onChange={this.handleChange}
              >
                {/* {this.state.options.map((option) => {
                  return <MenuItem value={option.Tax_Group_Name} key={option.id} >{option.Tax_Group_Name}</MenuItem>
                })} */}
              </TextField>
            </Grid>
            <Grid item xs={5} sm={5}>
              <TextField
                required
                id="Tax-Percent"
                name="TaxPercent"
                label="Percent"
                type="number"
                min={0}
                fullWidth
                variant="outlined"
                size='small'
                value={TaxPercent}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this.handlesubmit}>Add</Button>
        </CardActions>
      </Card>
    )
  }
}


export default AddsubTax 