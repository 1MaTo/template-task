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
    return db.user.put({user: 'singleUserId', _id: id })
        .then(() => true)
        .catch(err => console.log(err))
}