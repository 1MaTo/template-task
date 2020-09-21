import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openEditForm: false,
    elements: [
        {
            id: "1",
            name: "Task1",
            status: "В процессе",
            description: "Особое задание для продвинутых",
            isDeleted: false,
        },
        {
            id: "2",
            name: "Task2",
            status: "В процессе",
            description: "Очень простое задание",
            isDeleted: false,
        },
        {
            id: "3",
            name: "Task3",
            status: "В процессе",
            description: "Тут нужно подумать",
            isDeleted: false,
        },
        {
            id: "4",
            name: "Task4",
            status: "В процессе",
            description: "Особое задание для продвинутых",
            isDeleted: false,
        },
        {
            id: "5",
            name: "Task5",
            status: "В процессе",
            description: "Очень простое задание",
            isDeleted: false,
        },
        {
            id: "6",
            name: "Task6",
            status: "В процессе",
            description: "Тут нужно подумать",
            isDeleted: false,
        },
    ],
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        toggleEditForm: state => {
            state.openEditForm = !state.openEditForm
        }
    }
})

export const { toggleEditForm } = tasksSlice.actions

export default tasksSlice.reducer