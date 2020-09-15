import React, { Component, Fragment } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import { Ripple } from 'react-preloaders';
import routes from '../routes'
import { theme } from '../Themes'


class TheContent extends Component {
  state = {
  };

  render() { 
    return (
      <>
        <Fragment>
          <React.Suspense fallback={<Ripple />}>
            <Switch>
              {routes.map((route, idx) => {
                return route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                      <ThemeProvider theme={theme}>
                        <route.component {...props} />
                      </ThemeProvider>
                    )} />
                )
              })}
              <Redirect from="/" to='/Pos' />
            </Switch>
          </React.Suspense>
        </Fragment>
      </>
    )
  }
 
}


export default React.memo(TheContent)