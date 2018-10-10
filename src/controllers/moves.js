
import API from './api'

export function getAllMoves() {
    return API.get('moves')
}

export function addMove(name, kills) {
    return API.post(`moves`, {name, kills})
}

export function editMoveName(move, newName) {
    return API.put(`moves/editname/${move._id}`, {newName})
}

export function editMoveKills(move, newKills) {
    return API.put(`moves/editkills/${move._id}`, {newKills})
}

export function deleteMove(move) {
    return API.delete(`moves/${move._id}`)
}