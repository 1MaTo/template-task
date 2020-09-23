import React from 'react'
import { useSelector } from 'react-redux'
import { Task } from './Task'
import { Loading } from '../loading/Loading'
import styles from '../../styles/TasksList.module.scss'

export const TasksList = () => {

    const tasks = useSelector(state => state.tasks.elements)

    return (
        <div className={styles.background}>
            {tasks.length ?
                <React.Fragment>
                    {tasks.map(task => {
                        return <Task data={task} key={task._id} />
                    })}
                </React.Fragment> : <Loading />}
        </div>)
}