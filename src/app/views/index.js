import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
// import { Redirect } from "react-router-dom"
// HashRouter
class View extends Component {

  constructor(props) {
    super(props)
    this.state = {
     
    }
    
  }

  // componentWillUnmount() {
  //   this.abortController.abort()
  // }
  render() {
    const TheLayout = React.lazy(() => import('../containers/TheLayout'));
    return (
      <BrowserRouter>
        <Route path="/" name="Home" render={(props) => <TheLayout {...props} />} />
      </BrowserRouter>
    )
  }
}

export default View;