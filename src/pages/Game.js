import React, { Component } from 'react'
import { history } from './../index'

import GameOver from '../components/Game/GameOver'
import MovesList from '../components/Game/MovesList';

import * as moveActions from './../controllers/moves'
import * as gameActions from './../controllers/games'


var params = new URLSearchParams( window.location.search )


export default class Game extends Component {

  state = {
    turn: 1,
    lastMove: {},
    dbMoves: [],
    pOne: '',
    pTwo: '',
    pOneScore: 0,
    pTwoScore: 0,
    gameOver: false
  }


  refreshGame = () => {

    this.setState({
      rounds: undefined,
      turn: 1,
      lastMove: {},
      pOneScore: 0,
      pTwoScore: 0,
      gameOver: false,
      winner: ''
    })

  }


  endGame = (winner, pOneScore, pTwoScore) => {

    // Esto es una correccion temporal
    gameActions.addGame(this.state.pOne, this.state.pTwo)
    .then(res => {

        let game = res.data.game

        gameActions.endGame(game, pOneScore, pTwoScore)
        .then(() => this.setState({ gameOver: true, winner }) )
        .catch(err => console.log(err)) 

    })
    .catch(err => alert('Error creating the game', err) )       

  }

  ifOver(pOneScore, pTwoScore) {

    if (pOneScore === 3) {
      this.endGame(this.state.pOne, pOneScore, pTwoScore)
    } else if (pTwoScore === 3) {
      this.endGame(this.state.pTwo, pOneScore, pTwoScore)
    }

  }

  getRoundWinner = move => {
    
    let lastMove = this.state.lastMove

    if (lastMove.kills === move.name) {
      
      this.setState({ pOneScore: this.state.pOneScore+1 })
      this.ifOver(this.state.pOneScore+1, this.state.pTwoScore)
      return this.state.pOne;

    } else if (move.kills === lastMove.name) {

      this.setState({ pTwoScore: this.state.pTwoScore+1 })
      this.ifOver(this.state.pOneScore, this.state.pTwoScore+1)
      return this.state.pTwo;

    } else {

      return 'Draw';

    }
   

  }

  handleMoveClick = (move, e) => {

    if (this.state.turn === 2 ) {

      let roundWinner = this.getRoundWinner(move)
      
      if (!this.state.rounds) {

        this.setState({ rounds: [ { winner: roundWinner } ] })

      } else {
        
        this.setState(prevState => ({ rounds: [...prevState.rounds, { winner: roundWinner }] }))
        
      }      

      this.setState({
        turn: 1
      })

    } else {

      this.setState({
        turn: 2
      })

    }
    
    this.setState({ lastMove: move })

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

    console.log(this.props.location)

    this.setState({ 
      pOne: this.props.location.state.pOne, 
      pTwo: this.props.location.state.pTwo 
    })

    moveActions.getAllMoves()
    .then(res => { this.setState({ dbMoves: res.data.moves }) })

    this.unblock = history.block( () => {
  
      if (this.state.gameOver === false) {
        
        if (window.confirm('Are you sure you want to leave?')) {
  
          return true
  
        }
  
        return false

      }
      
      return true        

    })
    
  }

  componentWillUnmount = () => this.unblock() 
  

  render() {

    return (

      <div>

        <section align="center">
          <div className="container">
          
            <header align="center">

              <h3 id="round">Round {(this.state.rounds) ? this.state.rounds.length+1 : '1'}</h3>
              
              <div id="player-turn">
                <p className={(this.state.turn === 1 ) ? "active" : ""}>{this.state.pOne}</p>
                <p className={(this.state.turn === 2 ) ? "active" : ""}>{this.state.pTwo}</p>
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
