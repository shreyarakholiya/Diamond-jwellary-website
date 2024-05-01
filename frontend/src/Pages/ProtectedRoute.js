import React from 'react'
import { useSelector } from 'react-redux'
import { Route , Navigate } from 'react-router-dom';

const ProtectedRoute = ({isAdmin,component:Component , ...rest}) => {

    const {loading, user, isAuthenticated} = useSelector((state)=>state.user);

  return (
    <div>
        {loading === false && (
            <Route {...rest}  
            render = {(props) => {
                if(isAuthenticated === false){
                    return <Navigate to="/login" />;
                }

                if(isAdmin === true && user.role !== "admin"){
                    return <Navigate to="/login" />;
                }
                return <Component {...props} />;
            }}  
            />
        )}
    </div>
  )
}

export default ProtectedRoute