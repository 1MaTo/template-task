import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin : false,
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.user = action.payload
            state.isLogin = true
        },
        logOut: state => {
            state.user = null
            state.isLogin = false
        },
        updateUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { logIn, logOut, updateUser } = userSlice.actions

export default userSlice.reducer