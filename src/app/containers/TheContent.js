import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import { Ripple } from 'react-preloaders';
import routes from '../routes'
import { themeColor} from '../views/LayoutManeger/Themes'


class TheContent extends Component {
  state = {
    width: 0,
    height: 0,
  };

  render() {
    const { currentTab } = this.props.sync
    const [lastRoute] = routes.filter(tab => tab.name === currentTab)
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
                      <ThemeProvider theme={themeColor}>
                        <route.component {...props} />
                      </ThemeProvider>
                    )} />
                )
              })}
              <Redirect from="/" to={lastRoute.path} />
            </Switch>
          </React.Suspense>
        </Fragment>
      </>
    )
  }
  updateDimensions = () => {
    this.setState({ width: document.getElementById('Content').clientWidth, height: document.getElementById('Content').clientHeight });
  };
  componentDidMount() {
    if (this.state.width !== document.getElementById('Content').clientWidth) {
      this.updateDimensions()
    }
    if (this.state.height !== document.getElementById('Content').clientHeight) {
      this.updateDimensions()
    }
    window.addEventListener('resize', this.updateDimensions);

  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.DataStore,
    sync: state.SyncData,
    Auth: state.Auth,
  }
}
export default React.memo(connect(mapStateToProps)(TheContent))