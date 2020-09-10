import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import { getProfileFetch } from '../store/action/Auth';
import StyledDots from './LayoutManeger/Dots/Dots'


const Lodding=()=>{
  return (
    <div style={{height:'100%', width:'100%' ,display: 'flex', alignItems:'center', justifyContent: 'center',}}>
      <StyledDots/>
    </div>
  )
}

class dashbord extends Component {
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
    const { logIn } = this.props.Auth
    const TheLayout = React.lazy(() => import('../containers/TheLayout'));
    return (
      <React.Suspense fallback={<Lodding/>}>
        {logIn ?
          <BrowserRouter>
            <Route path="/" name="Home" render={(props) => <TheLayout {...props} />} />
          </BrowserRouter>
          :
          < Redirect to={'/'} />
        }
      </React.Suspense>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  }
}
export default connect(mapStateToProps, { getProfileFetch })(dashbord);

