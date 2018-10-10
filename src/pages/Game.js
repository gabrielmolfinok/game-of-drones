import React, { Component } from 'react'

import GameOver from '../components/Game/GameOver'
import MovesList from '../components/Game/MovesList';

import * as moveActions from './../controllers/moves'
import * as gameActions from './../controllers/games'


export default class Game extends Component {

  state = {
    turn: 1,
    lastMove: {},
    dbMoves: [],
    pOneScore: 0,
    pTwoScore: 0,
    game: this.props.location.state.game,
    gameOver: false
  }


  refreshGame = (game) => {

    this.setState({
      rounds: undefined,
      turn: 1,
      lastMove: {},
      pOneScore: 0,
      pTwoScore: 0,
      gameOver: false,
      winner: ''
    })
    
    if (game) {
      this.setState({ game })
    }

  }

  // componentWillUnmount = () => {
  //   // Se debe borrar el state
  //   this.refreshGame()
  // }


  endGame = (winner, pOneScore, pTwoScore) => {

    gameActions.endGame(this.state.game, pOneScore, pTwoScore)
    .then(() => this.setState({ gameOver: true, winner }) )
    .catch(err => console.log(err))    

  }

  ifOver(pOneScore, pTwoScore) {

    // Esta funcion controla si el score es de 3 para alguno de los jugadores
    if (pOneScore === 3) {
      this.endGame(this.state.game.playerOne, pOneScore, pTwoScore)
    } else if (pTwoScore === 3) {
      this.endGame(this.state.game.playerTwo, pOneScore, pTwoScore)
    }

    return

  }

  getRoundWinner = move => {
    
    let lastMove = this.state.lastMove

    if (move.kills === lastMove.name) {
        
      // PlayerTwo wins
      this.setState({ pTwoScore: this.state.pTwoScore+1 })
      this.ifOver(this.state.pOneScore, this.state.pTwoScore+1)
      return this.state.game.playerTwo;

    } else if (move.name === lastMove.name) {

      // Empate
      return 'Draw';

    } else {

      // PlayerOne wins
      this.setState({ pOneScore: this.state.pOneScore+1 })
      this.ifOver(this.state.pOneScore+1, this.state.pTwoScore)
      return this.state.game.playerOne;

    }

    

  }

  handleMoveClick = (move, e) => {

    if (this.state.turn === 2 ) {

      // Comprobar quien gano
      let roundWinner = this.getRoundWinner(move)
      
      if (!this.state.rounds) {

        // Es el primer Round, se debe crear en el state
        this.setState({
          rounds: [ { winner: roundWinner } ]
        })

      } else {
        
        // No es el primer Round, se debe agregar éste útlimo al state
        this.setState(prevState => ({
          rounds: [...prevState.rounds, { winner: roundWinner }]
        }))
        
      }      

      // Se cambia de turno
      this.setState({
        turn: 1
      })

    } else {

      // Se cambia de turno
      this.setState({
        turn: 2
      })

    }
    
    // Se suma el último movimiento al state
    this.setState({ lastMove: move })

    return


  }

  showRounds() {

    let rounds = this.state.rounds

    return (
      <div>
        {rounds.map((round, i) => (
            <article key={i}>
              <h3>{i+1}</h3>
              <p>{(round.winner === 'Draw') ? round.winner : `${ round.winner } wins`}</p>
            </article>
          ))}
      </div>
    )

  }  

  componentDidMount() {
    moveActions.getAllMoves()
    .then(res => { this.setState({ dbMoves: res.data.moves }) })
  }
  

  render() {

    return (

      <div>

        <section align="center">
          <div className="container">
          
            <header align="center">

              <h3 id="round">Round {(this.state.rounds) ? this.state.rounds.length+1 : '1'}</h3>
              
              <div id="player-turn">
                <p className={(this.state.turn === 1 ) ? "active" : ""}>{this.state.game.playerOne}</p>
                <p className={(this.state.turn === 2 ) ? "active" : ""}>{this.state.game.playerTwo}</p>
              </div>

              <div id="score" className="white-txt">
                <h3>{`${this.state.pOneScore} : ${this.state.pTwoScore}`}</h3>
              </div>

            </header>

  
            {(this.state.dbMoves.length > 0) ? <MovesList moves={this.state.dbMoves} click={this.handleMoveClick} /> : <h3 className="content">Loading moves...</h3>}


            <div className="content" align="left">
              <h2>Rounds details</h2>
              <div id="rounds-details">

                {(this.state.rounds) ? this.showRounds() : (
                  
                  <article>
                    <h3>1</h3>
                    <p>Waiting...</p>
                  </article>

                )}

              </div>
            </div>

          </div>
        </section>

        {(this.state.gameOver) ? <GameOver game={this.state.game} winner={this.state.winner} refreshGame={this.refreshGame} /> : null}

      </div>

    )
  }
}
