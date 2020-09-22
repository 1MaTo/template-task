import { configureStore } from '@reduxjs/toolkit'

import tasksReducer from './reducers/tasksSlice'
import userReducer from './reducers/userSlice'
import challengesReducer from  './reducers/challengesSlice'

export default configureStore({
    reducer: {
        tasks: tasksReducer,
        user: userReducer,
        challenges: challengesReducer,
    }
})