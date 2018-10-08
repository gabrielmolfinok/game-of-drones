
import API from './../api'

export function getAllMoves() {
    return API.get('api/moves')
}