import React from 'react';
import { Box, CssBaseline, Paper, ThemeProvider, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes as appRoutes } from '../../routes';
import Navbar from './../Navbar';
import Footer from './../Footer';
import ProtectedRoute, { ProtectedRouteProps } from '../ProtectedRoute';
import AuthService from './../../services/Auth/auth.service';

function App() {
    // define theme
    const theme = createTheme({
        palette: {
            primary: {
                light: '#63b8ff',
                main: '#0989e3',
                dark: '#005db0',
                contrastText: '#000',
            },
            secondary: {
                main: '#4db6ac',
                light: '#82e9de',
                dark: '#00867d',
                contrastText: '#000',
            },
            error: {
                light: '#e57373',
                main: '#f44336',
                dark: '#d32f2f',
                contrastText: '#000',
            },
            warning: {
                light: '#ffb74d',
                main: '#ffa726',
                dark: '#f57c00',
                contrastText: '#000',
            },
            info: {
                light: '#4fc3f7',
                main: '#29b6f6',
                dark: '#0288d1',
                contrastText: '#000',
            },
            success: {
                light: '#81c784',
                main: '#66bb6a',
                dark: '#388e3c',
                contrastText: '#000',
            },
        },
    });

    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
        isAuthenticated: !!AuthService.isAuthenticated(),
        authenticationPath: '/login',
    };

    const routing = appRoutes.map(route => {
        return route.enabled ? (
            <Route
                key={route.key}
                path={route.path}
                element={route.protected ? <ProtectedRoute {...defaultProtectedRouteProps} outlet={<route.component />} /> : <route.component />}
            >
                {!!route.children ? (
                    route.children.map(r => (
                        <Route
                            key={r.key}
                            path={r.path}
                            element={r.protected ? <ProtectedRoute {...defaultProtectedRouteProps} outlet={<r.component />} /> : <r.component />}
                        />
                    ))
                ) : (
                    <></>
                )}
            </Route>
        ) : (
            <></>
        );
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box height="100vh" display="flex" flexDirection="column">
                <Router>
                    <Routes>{routing}</Routes>
                </Router>
            </Box>
        </ThemeProvider>
    );
}

export default App;
