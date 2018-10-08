import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as gameActions from './../controllers/games'

export default class GameOver extends Component {

    restartGame = (game, history, e) => {

        e.preventDefault()

        console.log(game.playerOne, game.playerTwo);

        gameActions.addGame(game.playerOne, game.playerTwo)
                    .then(res => {
                        console.log('juego creado: ', res.data.game)
                        this.props.refreshGame(res.data.game)
                    })
                    .catch(err => console.log(err)) 
    }

    render() {

        const { game, winner, history } = this.props

        return (

            <div id="game-finished">
                <div className="container">
                    
                    <header align="center">
                        <h1>We have a winner!</h1>
                        <p>{`${winner} is the new emperor!`}</p>
                        <a href="#" className="btn" onClick={this.restartGame.bind(this, game, history)}>Play again</a>
                        <Link to="/">Volver a inicio</Link>
                    </header>

                </div>
            </div>

        )
    }
}
