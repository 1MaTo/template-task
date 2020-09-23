import React from 'react'
import { Menu } from '../components/menu/Menu'
import { TasksList } from '../components/tasks/TasksList'

export const Tasks = () => {

    return <React.Fragment>
        <Menu />
        <TasksList />
    </React.Fragment>
}