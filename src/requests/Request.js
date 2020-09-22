import axios from 'axios'

export const LoginRequest = ({ name, code }) =>
    axios.get('/users')
        .then(response => {
            if (response.status === 200) {
                const user = response.data.find(user => user.name === name && user.code === code)
                if (user) return user
                else return false
            } else {
                return false
            }
        })
        .catch(err => {
            return false
        })

export const ChallengesRequest = () =>
    axios.get('/challenges')
        .then(response => {
            if (response.status === 200) {
                return response.data
            } else {
                return false
            }
        })
        .catch(err => {
            return false
        })