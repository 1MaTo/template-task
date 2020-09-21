import React from 'react'
import { useSelector } from 'react-redux'
import { Task } from './Task'

export const TasksList = () => {
    const tasks = useSelector(state => state.tasks.elements)

    const renderedTasks = tasks.map(task => (
        <Task key={task.id} data={task} />
    ))

    return (
        <>
            {renderedTasks}
        </>
    )
}