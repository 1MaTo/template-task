import React from 'react'
import { ChallengesList } from '../components/challenges/ChallengesList'
import { Menu } from '../components/menu/Menu'

export const Challenges = () => {

    return <React.Fragment>
        <Menu />
        <ChallengesList />
    </React.Fragment>
}