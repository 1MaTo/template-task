import { db } from './TempateDB'

export const getUserId = () => {
    return db.user.get('singleUserId').then(user => {
        return user._id
    })
        .catch(err => {
            console.log(err)
        })
}

export const setUserId = (id) => {
    return db.user.put({ user: 'singleUserId', _id: id })
        .then(() => true)
        .catch(err => console.log(err))
}

export const saveTasks = (tasks) => {
    return db.tasks.bulkAdd([...tasks])
        .then(() => true)
        .cath(err => console.log(err))
}

export const saveChallenges = (challenges) => {
    return db.challenges.bulkPut([...challenges])
}

export const getChallenges = () => {
    return db.challenges.get()
        .toArray()
}
