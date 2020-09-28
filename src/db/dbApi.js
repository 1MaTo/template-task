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
    db.tasks.clear()
    return db.tasks.bulkPut([...tasks])
}

export const saveTask = (task) => {
    return db.tasks.put(task)
}

export const updateTask = (_id, report, images, state) => {
    return db.tasks.update(_id, {report: report, images: [...images], state: state})
}

export const saveChallenges = (challenges) => {
    db.tasks.clear()
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
