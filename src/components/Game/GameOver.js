import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as gameActions from '../../controllers/games'

export default class GameOver extends Component {

    restartGame = (game, e) => {

        e.preventDefault()
        gameActions.addGame(game.playerOne, game.playerTwo)
                    .then(res => { this.props.refreshGame(res.data.game) })
                    .catch(err => console.log(err)) 

    }

    render() {

        const { game, winner } = this.props

        return (

            <div id="game-finished">
                <div className="container">
                    
                    <header align="center">
                        <img src="/img/icons/crown.svg" alt="crown" width="100" />
                        <h1>We have a winner!</h1>
                        <p><b>{winner}</b> is the new emperor!</p>
                        <button className="btn" onClick={this.restartGame.bind(this, game)}>Play again</button>
                        <Link to="/" className="btn secondary">Volver a inicio</Link>
                    </header>

                </div>
            </div>

        )
    }
}
