import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const AuthRoute = ({ type, ...props }) => {
    const isLogin = useSelector(state => state.user.isLogin)
    if (type === "guest" && isLogin) return <Redirect to='/challenges' />
    else if (type === 'private' && !isLogin) return <Redirect to="/login" />

    return <Route {...props} />
}