import React from 'react';
import { Navigate, Route, useLocation } from 'react-router-dom';
import { useAuth } from './Login/AuthProvider'; // Adjust path as needed
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ element: Element, requiredRole, ...rest }) => {
    const { user } = useAuth();
    const location = useLocation();

    const token = Cookies.get('token');
    let userRole = '';

    if (token) {
        try {
            const decoded = jwtDecode(token);
            userRole = decoded?.userData?.userRole || '';
        } catch (e) {
            console.error("Failed to decode token:", e);
        }
    }

    if (!token) {
        return <Navigate to="/user-login" state={{ from: location }} replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/not-authorized" state={{ from: location }} replace />;
    }

    return <Element {...rest} />;
};

export default PrivateRoute;
