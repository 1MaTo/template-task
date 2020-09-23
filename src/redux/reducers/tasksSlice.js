import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    elements: []
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.elements = [...state.elements, action.payload]
        },
        updateTasks: (state, action) => {
            state.elements = action.payload
        },
        updateReport: (state, action) => {
            const { _id, report, images } = action.payload
            const existingTask = state.elements.find(task => task._id === _id)
            if (existingTask) {
                existingTask.report = report
                existingTask.images = images
            }
        },
        updateTaskState: (state, action) => {
            const existingTask = state.elements.find(task => task._id === action.payload._id)
            if (existingTask) {
                existingTask.state = action.payload.state
            }
        }
    }
})

export const { toggleEditForm, updateTasks, addTask, updateReport, updateTaskState } = tasksSlice.actions

export default tasksSlice.reducer