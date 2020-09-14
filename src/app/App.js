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
    // const { logIn } = this.props.Auth

    // function retry(fn, retriesLeft = 5, interval = 1000) {
    //   return new Promise((resolve, reject) => {
    //     fn()
    //       .then(resolve)
    //       .catch((error) => {
    //         setTimeout(() => {
    //           if (retriesLeft === 1) {
    //             // reject('maximum retries exceeded');
    //             reject(error);
    //             return;
    //           }
    
    //           // Passing on "reject" is the important part
    //           retry(fn, retriesLeft - 1, interval).then(resolve, reject);
    //         }, interval);
    //       });
    //   });
    // }
    // // const TheLayout = React.lazy(() => import('./containers/TheLayout'));
    // // const Login = React.lazy(() => import());
    // // const Login = React.lazy(() => retry(() => import('./views/LogIn/index')));
    // const TheLayout = React.lazy(() => retry(() => import('./containers/TheLayout')));
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






