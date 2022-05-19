//pages
import Login from './features/Auth/Login';
import Signup from './features/Auth/Signup';
import NotFound from './features/NotFound';
import JoinElements from './features/JoinElements';

// other
import Route from './interfaces/route.interface';
import { Navigate } from 'react-router-dom';

export const routes: Array<Route> = [
    {
        key: 'join-elements-route',
        title: 'JoinElements',
        path: '/',
        enabled: true,
        protected: false,
        component: JoinElements,
    },
    // {
    //     key: 'login-route',
    //     title: 'Login',
    //     path: '/login',
    //     enabled: true,
    //     protected: false,
    //     component: Login,
    // },
    // {
    //     key: 'signup-route',
    //     title: 'Signup',
    //     path: '/signup',
    //     enabled: true,
    //     protected: false,
    //     component: Signup,
    // },
    {
        key: 'not-found-route',
        title: 'NotFound',
        path: '/404',
        enabled: true,
        protected: false,
        component: NotFound,
    },
    {
        key: 'wierd-route',
        title: 'Wierd',
        path: '*',
        enabled: true,
        protected: false,
        component: NotFound,
    },
];
