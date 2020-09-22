import React from 'react';
import { LoginForm } from '../components/login/LoginForm'
import styles from '../styles/LoginPage.module.scss'

export const Login = () => {
    return (
        <div className={styles.background}>
            <LoginForm />
        </div>
    )
}