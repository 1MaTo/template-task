import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Task } from './Task'
import { Loading } from '../loading/Loading'
import styles from '../../styles/TasksList.module.scss'
import { TasksRequest } from '../../requests/Request'
import { updateTasks } from '../../redux/reducers/tasksSlice'

export const TasksList = () => {

    const tasks = useSelector(state => state.tasks.elements)
    const userId = useSelector(state => state.user.user._id)
    const dispatch = useDispatch()

    useEffect(() => {
        TasksRequest(userId)
            .then(tasks => {
                if (tasks) {
                    dispatch(updateTasks(tasks))
                }
            })
    }, [])

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