import { Button, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserId } from '../../db/dbApi'
import { logIn, updateUser } from '../../redux/reducers/userSlice'
import { LoginRequest } from '../../requests/Request'
import styles from '../../styles/LoginForm.module.scss'

export const LoginForm = () => {

    const dispatch = useDispatch()

    const [loginData, setLoginData] = useState({
        name: '',
        code: ''
    })

    const [err, setErr] = useState({})

    const handleChange = (e, field) => {
        setLoginData({ ...loginData, [field]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let tempErr = {}
        Object.entries(loginData).map(item => {
            if (item[1] === '') tempErr[item[0]] = true
        })
        if (Object.keys(tempErr).length > 0) {
            setErr(tempErr)
        } else {
            setErr(tempErr)
            LoginRequest(loginData)
                .then(user => {
                    if (user) {
                        setUserId(user._id)
                        dispatch(updateUser(user))
                        dispatch(logIn())
                    } else {
                        setErr({
                            name: true,
                            code: true
                        })
                    }
                })
        }
    }

    return (
        <div className={styles.background}>
            <Typography className="login-title">Войдите в систему</Typography>
            <form>
                <TextField
                    className={styles.loginInput}
                    color="secondary"
                    id="login-name"
                    label="Логин"
                    onChange={(e) => handleChange(e, 'name')}
                    error={Boolean(err.name)}
                    value={loginData.name}
                    helperText={Boolean(err.name) && 'Неправильный логин'}
                />
                <TextField
                    className={styles.loginInput}
                    color="secondary"
                    id="login-code"
                    label="Пароль"
                    type="password"
                    onChange={(e) => handleChange(e, 'code')}
                    error={Boolean(err.code)}
                    value={loginData.code}
                    helperText={Boolean(err.code) && 'Неправильный пароль'}
                />
                <Button type='submit' onClick={handleSubmit} className={styles.loginButton} variant="contained">
                    Войти
                </Button>
            </form>
        </div>
    )
}