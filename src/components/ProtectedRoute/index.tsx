import React, { Component, FC, ReactElement } from 'react';
import AuthService from '../../services/Auth/auth.service';
import { Navigate, useNavigate, Route } from 'react-router-dom';
import IRoute from '../../interfaces/route.interface';

export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
    outlet: JSX.Element;
};

export default function ProtectedRoute({ isAuthenticated, authenticationPath, outlet }: ProtectedRouteProps) {
    // console.log(`[Auth] isAuthenticated in ProjectedRouteL ${isAuthenticated}`);
    if (isAuthenticated) {
        return outlet;
    } else {
        // console.log(`[Auth] authenicationPath: ${authenticationPath}`);
        return <Navigate to={{ pathname: authenticationPath }} />;
    }
}
