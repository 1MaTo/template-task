import { db } from './TempateDB'

export const getUserId = () => {
    return db.user.get('singleUserId').then(user => {
        return user._id
    }).catch(err => {
        console.log(err)
    })
}

export const setUserId = (id) => {
    return db.user.put({ user: 'singleUserId', _id: id })
        .then(() => true)
        .catch(err => console.log(err))
}

export const saveTasks = (tasks) => {
    console.log(tasks)
    db.tasks.clear()
    return db.tasks.bulkPut([...tasks])
}

export const saveTask = (task) => {
    return db.tasks.put(task)
}

export const updateTask = (_id, report, images, state) => {
    return db.tasks.update(_id, { report: report, images: [...images], state: state })
}

export const saveChallenges = (challenges) => {
    db.challenges.clear()
    return db.challenges.bulkPut([...challenges])
}

export const getTasks = () => {
    return db.tasks.get()
        .toArray()
}

export const getChallenges = () => {
    return db.challenges.get()
        .toArray()
}

export const saveChallengesQueue = (queue) => {
    console.log(queue)
    return db.challengesQueue.add(queue)
}

export const getChallengesQueue = () => {
    return db.challengesQueue.get()
        .toArray()
}

export const clearChallengesQueue = () => {
    return db.challengesQueue.clear()
}
