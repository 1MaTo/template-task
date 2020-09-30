import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { update } from '../../redux/reducers/challengesSlice'
import { ChallengesRequest } from '../../requests/Request'
import { Challenge } from './Challenge'
import { Loading } from '../loading/Loading'
import styles from '../../styles/ChallengesList.module.scss'
import { setOnlineStatus } from '../../redux/reducers/userSlice'

export const ChallengesList = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        ChallengesRequest()
            .then(({ data, connetionStatus }) => {
                console.log('tut')
                if (connetionStatus === "offline") {
                    dispatch(setOnlineStatus(false))
                } else {
                    dispatch(setOnlineStatus(true))
                }
                dispatch(update(data))
            })
    }, [])

    const challenges = useSelector(state => state.challenges.items)

    return (
        <div className={styles.background}>
            {challenges.length ?
                <React.Fragment>
                    {challenges.map(challenge => {
                        return <Challenge data={challenge} key={challenge._id} />
                    })}
                </React.Fragment> : <Loading />}
        </div>)
} 