
import API from './api'

export function getAllGames() {
    return API.get('games')
}

export function getPlayerWons(player) {
    return API.get(`games/player/${player}`)
}

export function addGame(playerOne, playerTwo) {
    return API.post('games', {playerOne, playerTwo})
}

export function endGame(game, pOneScore, pTwoScore) {
    return API.put(`games/${game._id}`, {game, pOneScore, pTwoScore})
}