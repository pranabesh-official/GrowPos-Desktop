import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { Card, Button, Grid, CardContent, CardActions } from '@material-ui/core';
import { List } from 'semantic-ui-react'
import io from 'socket.io-client'

const socket =io.connect('http://localhost:4000')
class Chatapp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      Massage: '',
      chat:[]
    }
  }
  componentDidMount(){
    const updatedchat= [...this.state.chat]
    socket.on('message', ({name, Massage})=>{
      updatedchat.push({name, Massage})
      this.setState({...this.state, chat: updatedchat })
    })
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleSend() {
    const { name, Massage } = this.state
    socket.emit('message', {name, Massage})
    this.setState({name:'', Massage:''})
 
  }
  render() {
    const { name, Massage , chat} = this.state
    const renderChat =()=>{
      return (
        chat.map(({name , Massage}, index)=>(
          <List key={index}>
            <p>{`${name} said : ${Massage}` } </p> 
          </List>
        ))
      )
    }
    return (
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Card>
            <Grid container spacing={2}>
            <Grid item sm={12} style={{marginTop:'8px'}}>
              <TextField
                required
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                size='small'
                value={name}
                onChange={this.handleChange.bind(this)}
              />
              </Grid>
              <Grid item sm={12}>
              <TextField
                required
                name="Massage"
                label="Massage"
                type="text"
                fullWidth
                variant="outlined"
                size='small'
                value={Massage}
                onChange={this.handleChange.bind(this)}
              />
            </Grid>
            </Grid>
            <CardActions>
              <Button onClick ={this.handleSend.bind(this)} >send</Button>
            </CardActions>
          </Card>
          <Grid item sm={12}>
            <Card variant="outlined">
              <CardContent>
                <h3>CHAT LOG</h3>
                {renderChat()}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default Chatapp;