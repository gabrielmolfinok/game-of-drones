import React, { Component } from 'react'

import GameOver from './../components/GameOver'

import * as moveActions from './../controllers/moves'
import * as gameActions from './../controllers/games'


export default class Game extends Component {

  state = {
    turn: 1,
    moves: [],
    dbMoves: [],
    pOneScore: 0,
    pTwoScore: 0,
    game: this.props.location.state.game,
    gameOver: false,
    winner: ''
  }


  refreshGame = (game) => {
    this.setState({
      rounds: undefined,
      turn: 1,
      moves: [],
      pOneScore: 0,
      pTwoScore: 0,
      game,
      gameOver: false,
      winner: ''
    })
    console.log('Cambio a juego: ', game.id);
  }


  endGame = (winner, pOneScore, pTwoScore) => {

    console.log(pOneScore, pTwoScore)
    gameActions.endGame(this.state.game, pOneScore, pTwoScore)
                  .then(res => console.log(res))

    this.setState({ gameOver: true, winner })
  }

  ifOver(pOneScore, pTwoScore) {
    if (pOneScore === 3) {
      
      // alert('Player One wins')
      this.endGame(this.state.game.playerOne, pOneScore, pTwoScore)

    } else if (pTwoScore === 3) {
      
      // alert('Player Two wins')
      this.endGame(this.state.game.playerTwo, pOneScore, pTwoScore)

    } 
  }

  getRoundWinner = move => {
    
    let lastMove = this.state.moves[this.state.moves.length-1]

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

      this.setState(prevState => ({
        moves: [...prevState.moves, move]
      }))

      
      if (!this.state.rounds) {
        // Primer Round
        this.setState({
          rounds: [
            {
              winner: roundWinner
            }
          ]
        })

      } else {
        
        this.setState(prevState => ({
          rounds: [...prevState.rounds, { number: this.state.rounds.length, winner: roundWinner }]
        }))
        
      }      

      this.setState({
        turn: 1
      })

    } else {

      this.setState(prevState => ({
        moves: [...prevState.moves, move]
      }))

      this.setState({
        turn: 2
      })

    }

  }

  getMoves() {

    moveActions.getAllMoves()
                  .then(res => { this.setState({ dbMoves: res.data.moves }) })

    return (

      <div id="moves" className="content">

        {this.state.dbMoves.map((move, i) => (

          <article className="move" key={i} onClick={this.handleMoveClick.bind(this, move)}>
            <h2>{move.name}</h2>
          </article>

        ))}

      </div>


    )

  }

  showRounds() {
    if (this.state.rounds) {
      // Ya paso el primer Round
      return (
        <div className="content" align="left">
          <h2>Rounds details</h2>
          <div id="rounds-details">
            {this.state.rounds.map((round, i) => (
              <article>
                <h3>Round: {i+1}</h3>
                <p>Winner: {round.winner}</p>
              </article>
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div className="content" align="left">
          <h2>Rounds details</h2>
          <div id="rounds-details">
            <article>
              <h3>Round: 1</h3>
              <p>Winner: Waiting...</p>
            </article>
          </div>
        </div>
      )
    }
  }
  

  componentWillUnmount = () => {
    // Se debe borrar el state
    this.setState({
      round: 1,
      turn: 1,
      moves: [],
      dbMoves: [],
      pOneScore: 0,
      pTwoScore: 0,
      game: {},
      gameOver: false,
      winner: ''
    })
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

        
            {this.getMoves()}

            {this.showRounds()}
  

          </div>
        </section>

        {(this.state.gameOver) ? <GameOver game={this.state.game} winner={this.state.winner} history={this.props.history} refreshGame={this.refreshGame} /> : null}

      </div>

    )
  }
}
