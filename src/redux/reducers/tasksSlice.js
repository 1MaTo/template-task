import { createSlice } from '@reduxjs/toolkit'
import { saveTasks, updateTask, saveTask } from '../../db/dbApi'

const initialState = {
    elements: []
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
/*             const newTaskChallengeId = action.payload.challenge._id
            existingTask = state.elements.find(task => task.challenge._id === newTaskChallengeId && task.state === "InProgress")
            if (existingTask) {
                existingTask._id = action.payload._id
            } */
            state.elements = [...state.elements, action.payload]
            saveTask(action.payload)
        },
        updateTasks: (state, action) => {
            state.elements = action.payload
            saveTasks(action.payload)
        },
        updateReport: (state, action) => {
            const { _id, report, images } = action.payload
            const existingTask = state.elements.find(task => task._id === _id)
            if (existingTask) {
                existingTask.report = report
                existingTask.images = images
                updateTask(_id, report, images, existingTask.state)
            }
        },
        updateTaskState: (state, action) => {
            const existingTask = state.elements.find(task => task._id === action.payload._id)
            if (existingTask) {
                existingTask.state = action.payload.state
                updateTask(existingTask._id, existingTask.report, existingTask.images, existingTask.state)
            }
        }
    }
})

export const { toggleEditForm, updateTasks, addTask, updateReport, updateTaskState } = tasksSlice.actions

export default tasksSlice.reducer