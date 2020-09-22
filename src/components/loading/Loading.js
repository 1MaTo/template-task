import { CircularProgress } from '@material-ui/core'
import React from 'react'
import styles from '../../styles/Loading.module.scss'

export const Loading = () => {

    return (
        <div className={styles.loadingContainer}>
            <CircularProgress color="secondary" />
        </div>
    )
}