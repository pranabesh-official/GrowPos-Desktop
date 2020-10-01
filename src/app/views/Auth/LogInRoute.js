import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


const LogInRoute = ({ component: Component, Auth, ...rest }) => {
    const {islogedIn} =Auth
    return (
        <Route
            {...rest}
            render={props => {
                if (islogedIn) {
                    return <Redirect to={
                        {
                            pathname: '/',
                            state: {
                                from: props.location
                            }
                        }
                    } />

                } else {
                    return <Component {...props} />
                }
            }}
        />
    )
}
const mapStateToProps = (state) => {
    return {
        Auth: state.Auth,
    }
}

export default connect(mapStateToProps)(LogInRoute)
