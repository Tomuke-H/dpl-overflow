import React, { useContext } from 'react'
import { Redirect, Route, useHistory } from 'react-router'
import { AuthContext } from '../providers/AuthProvider'

const ProtectedRoute = ({component:Component}) =>{
    const {authenticated} = useContext(AuthContext)
    const history = useHistory()

    return (
        <Route 
            render={(props) => authenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: "/login", 
                    from: props.location
                }}
                />
            )   
            }
        />
    )
}

export default ProtectedRoute;