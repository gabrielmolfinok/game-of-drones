
import API from './../api'

export function getAllMoves() {
    return API.get('api/moves')
}

export function addMove(name, kills) {
    return API.post(`api/moves`, {name, kills})
}

export function editMoveName(move, newName) {
    return API.put(`api/moves/editname/${move._id}`, {newName})
}

export function editMoveKills(move, newKills) {
    return API.put(`api/moves/editkills/${move._id}`, {newKills})
}

export function deleteMove(move) {
    return API.delete(`api/moves/${move._id}`)
}