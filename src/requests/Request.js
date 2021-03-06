import axios from 'axios'
import { getChallenges, getTasks } from '../db/dbApi'

export const LoginRequest = ({ name, code }) => {
    return axios.get('/users')
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
}

export const LoginByIdRequest = (id) => {
    return axios.get(`/users/${id}`)
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
}

export const ChallengesRequest = () =>
    axios.get('/challenges')
        .then(response => {
            if (response.status === 200) {
                return {data: response.data, connetionStatus: response.statusText}
            } else {
                return false
            }
        })
        .catch(err => {
            return false
        })

export const AcceptChallengeRequest = (data) =>
    axios.post('challenges/accept', data)
        .then(response => {
            if (response.status === 201) {
                return response.data
            } else {
                return false
            }
        })
        .catch(err => {
            return false
        })

export const TasksRequest = (id) =>
    axios.get(`tasks/user/${id}`)
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


export const UpdateTaskRequest = (task) =>
    axios.put(`tasks/`, task)
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