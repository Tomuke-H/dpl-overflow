import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { AuthContext } from '../providers/AuthProvider'

const ProtectedRoute = ({component:Component}) =>{
    const {authenticated} = useContext(AuthContext)

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