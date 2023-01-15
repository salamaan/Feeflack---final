import React from 'react'
import {AuthenticationService} from "../../service/AuthenticationService";
import {Navigate} from "react-router-dom";

export interface PrivateRouteProps {
    component: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const {component} = props;

    return AuthenticationService.isLogged()
        ? component
        : <Navigate to="/login"/>
}

export default PrivateRoute