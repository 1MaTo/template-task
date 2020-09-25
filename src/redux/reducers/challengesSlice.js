import { createSlice } from '@reduxjs/toolkit'
import { saveChallenges } from '../../db/dbApi'

const initialState = {
    items: []
}

const challengesSLice = createSlice({
    name: 'challenges',
    initialState,
    reducers: {
        update: (state, action) => {
            state.items = [...action.payload]
            saveChallenges(action.payload)
        }
    }
})

export const { update } = challengesSLice.actions

export default challengesSLice.reducer