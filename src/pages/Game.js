import React, { Component } from 'react'

import * as moveActions from './../controllers/moves'
import * as gameActions from './../controllers/games'


export default class Game extends Component {

  state = {
    round: 1,
    turn: 1,
    moves: [],
    game: this.props.location.state.game
  }

  handleMoveClick = (move, e) => {

    // Aqui se debe actualizar en la BD el juego actual
    // agregando a su objeto 'playerMoves', el movimiento recibido
    // en esta funcion...

    // gameActions.updateGame(this.state.game, move)

    this.setState({
      turn: this.state.turn+1
    })

  }

  getMoves() {

    moveActions.getAllMoves()
                  .then(res => { this.setState({ moves: res.data.moves }) })

    return (

      <div id="moves" className="content white-txt">

        {this.state.moves.map((move, i) => (

          <article className="move" key={i} onClick={this.handleMoveClick.bind(this, move)}>
            <h2>{move.name}</h2>
          </article>

        ))}

      </div>


    )

  }

  componentWillUnmount = () => {
    // Se debe borrar el state
  }
  

  render() {

    return (

      <div>

        <section align="center">
          <div className="container">
          
            <header>
              <h1>{`Round ${this.state.round}`}</h1>
            </header>

            <div className="content white-txt" id="player-turn">
              <p className={(this.state.turn & 1 ) ? "active" : ""}>{this.state.game.playerOne}</p>
              <p className={(this.state.turn & 1 ) ? "" : "active"}>{this.state.game.playerTwo}</p>
            </div>


            {this.getMoves()}
  

          </div>
        </section>

      </div>

    )
  }
}
