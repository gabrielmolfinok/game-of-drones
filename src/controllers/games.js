
import API from './../api'

export function getAllGames() {
    return API.get('api/games')
}

export function addGame(playerOne, playerTwo) {
    return API.post('api/games', {playerOne, playerTwo})
}

// export function updateGame(move) {
//     return API.post('api/games', {playerOne, playerTwo})
// }