import React, { use } from 'react';
import { AuthenticationContext } from '../Context/AuthenticationContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

    const { user }= use(AuthenticationContext )
const location = useLocation()

    if (!user){
        return <Navigate to="/sing_in" state={location.pathname}/>
    }

    return children
};

export default PrivateRoute;