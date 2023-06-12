import * as React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props: PrivateRouteProps) => {

    const TOKEN = localStorage.getItem('token');

    if (!TOKEN) {
        return <Navigate to="/login" />;
    } else {
        return props.children;
    }
};

interface PrivateRouteProps {
    children: React.ReactElement;
};

export default PrivateRoute;