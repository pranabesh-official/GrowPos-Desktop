import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
// import { Redirect } from "react-router-dom"
// HashRouter
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { getProfileFetch } from '../store/action/Auth';

class View extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }

  }
  componentDidMount() {
      this.props.getProfileFetch()
  }

  render() {
    const { logIn} = this.props.Auth

    const TheLayout = React.lazy(() => import('../containers/TheLayout'));

    return (
      <React.Fragment>
        { logIn ?
          <BrowserRouter>
            <Route path="/" name="Home" render={(props) => <TheLayout {...props} />} />
          </BrowserRouter>
          :
          < Redirect to = { '/'} />
        }

      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  }
}
export default connect(mapStateToProps, { getProfileFetch })(View);

