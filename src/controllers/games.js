
import API from './../api'

export function getAllGames() {
    return API.get('api/games')
}

export function addGame(playerOne, playerTwo) {
    return API.post('api/games', {playerOne, playerTwo})
}

export function endGame(game, pOneScore, pTwoScore) {
    return API.put(`api/games/${game._id}`, {game, pOneScore, pTwoScore})
}