import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import './scss/style.scss';
import './App.css';
import { connect } from 'react-redux'
import { getProfileFetch } from './store/action/Auth';
import { Ripple } from 'react-preloaders';
import Login from './views/LogIn/index'
import TheLayout from './containers/TheLayout'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }
  componentDidMount() {
    this.props.getProfileFetch()
  }
  componentWillUnmount() {
    this.props.getProfileFetch()
  }

  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={<Ripple />}>
          <Switch>
            <Route path="/login" name="login" component={Login} />
            <Route path="/" name="Home" component={TheLayout} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  }
}
export default connect(mapStateToProps, { getProfileFetch } )(App);






