import React, { Fragment, useEffect } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { Ripple } from 'react-preloaders';
import routes from '../routes'
import { connect } from 'react-redux'
import { getProfileFetch } from '../store/action/Auth';


const TheContent = (props) => {

  const { islogedIn , currentUser} = props.Auth
  useEffect(() => {
    if (currentUser === null)
      props.getProfileFetch()
  }, [props, currentUser])

  return (
    <>
      <Fragment>
        <React.Suspense fallback={<Ripple />}>
          {
            islogedIn ?
              <Switch>
                {
                  routes.map((route, idx) => {
                    return route.component && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />

                    )
                  })
                }
                <Redirect from="/" to={
                  {
                    pathname: '/Pos',
                    state: {
                      from: props.location
                    }
                  }
                } />
              </Switch>
              :
              <Redirect from="/" to={
                {
                  pathname: '/login',
                  state: {
                    from: props.location
                  }
                }
              } />
          }
        </React.Suspense>
      </Fragment>
    </>
  )
}


const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
    Shop: state.Shop,
  }
}

export default connect(mapStateToProps, { getProfileFetch })(React.memo(TheContent))
