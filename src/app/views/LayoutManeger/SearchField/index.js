import React from 'react'
import TextField from '@material-ui/core/TextField'

import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
const style = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: 'auto',
  },
  resize: {
    fontSize: 11
  }

});
class SearchField extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const { dispatcher } = this.props
    this.props.dispatch(dispatcher(event.target.value))
    event.preventDefault()
  }

  render() {
    const { classes, placeholder } = this.props
    return (
      <TextField
        label={placeholder}
        placeholder={placeholder}
        InputProps={{ classes: { input: classes.resize } }}
        className={classes.textField}
        margin="normal"
        size="small"
        autoFocus={true}
        variant="outlined"
        onChange={this.onChange}
      />
    )
  }
}

export default withStyles(style)(connect()(SearchField))