import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const PublicRoute = ({ component: Component, restricted, ...rest }) => {

    const isLogin = useSelector(state => state.user.isLogin)

    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin && restricted ?
                <Redirect to="/tasks" />
                : <Component {...props} />
        )} />
    );
};

export const PrivateRoute = ({ component: Component, page, ...rest }) => {

    const isLogin = useSelector(state => state.user.isLogin)

    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin ?
                <Component page={page} {...props} />
                : <Redirect to="/login" />
        )} />
    );
};