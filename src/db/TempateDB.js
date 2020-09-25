import Dexie from 'dexie'

export const db = new Dexie('db')
db.version(1).stores({
    user: "user",
    tasks: "_id",
    challenges: "_id",
})

db.on("populate", () => {
    db.user.add({user : 'singleUserId', _id: null})
    db.tasks.bulkAdd([])
    db.challenges.bulkAdd([])
})