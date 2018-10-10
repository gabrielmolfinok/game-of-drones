
import API from './api'

export function getAllUsers() {
    return API.get('users')
}

export function getUserByName(userName) {
    return API.get(`users/${userName}`)
}

export function addUser(user) {
    return API.post('users', { user })
}