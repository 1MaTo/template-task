import { createSlice } from '@reduxjs/toolkit'
import { getChallengesQueue, saveChallenges, saveChallengesQueue } from '../../db/dbApi'

const initialState = {
    items: [],
    pendingQueue: []
}

const challengesSLice = createSlice({
    name: 'challenges',
    initialState,
    reducers: {
        update: (state, action) => {
            state.items = [...action.payload]
            saveChallenges(action.payload)
        },
        addChallengeToQueue: (state, action) => {
            state.pendingQueue = [...state.pendingQueue, action.payload]
            saveChallengesQueue({ _id: action.payload })
        },
        clearPandingQueue: (state) => {
            state.pendingQueue = []
            clearPandingQueue(state.pendingQueue)
        },
        getChallengesQueueFromBD: (state) => {
            getChallengesQueue()
                .then(data => {
                    state.pendingQueue = data.map(el => el._id)
                })
        }
    }
})

export const { update, clearPandingQueue, addChallengeToQueue } = challengesSLice.actions

export default challengesSLice.reducer