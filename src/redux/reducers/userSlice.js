import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin : false,
    isOnline: true,
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state, action) => {
            //state.user = action.payload
            state.isLogin = true
        },
        logOut: state => {
            //state.user = null
            state.isLogin = false
        },
        updateUser: (state, action) => {
            state.user = action.payload
        },
        setOnlineStatus: (state, action) => {
            state.isOnline = action.payload
        }
    }
})

export const { logIn, logOut, updateUser, setOnlineStatus } = userSlice.actions

export default userSlice.reducer