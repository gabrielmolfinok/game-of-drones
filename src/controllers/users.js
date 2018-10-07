
import API from './../api'

export function getAllUsers() {
    return API.get('api/users')
}

export function getUserByName(userName) {
    return API.get(`api/users/${userName}`)
}

export function addUser(user) {
    return API.post('api/users', { user })
}