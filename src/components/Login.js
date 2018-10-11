import React, { Component } from 'react'

import * as userActions from '../controllers/users'
import * as gameActions from '../controllers/games'

export default class Login extends Component {

    state = {
        playerOneName: '',
        playerTwoName: ''
    }

    handleInput = e => {
        if (e.target.id === 'playerOne') {
            let playerOneName = e.target.value
            this.setState({ playerOneName })
        } else {
            let playerTwoName = e.target.value
            this.setState({ playerTwoName })
        }
    }

    handleSubmit = (e) => {

        e.preventDefault()

        const game = {
            playerOne: this.state.playerOneName,
            playerTwo: this.state.playerTwoName
        }

        userActions.addUser(game.playerOne)
        .then(res => { game.playerOne = res.data.user })

        userActions.addUser(game.playerTwo)
        .then(res => { game.playerTwo = res.data.user })

        gameActions.addGame(game.playerOne, game.playerTwo)
        .then(res => {
            let game = res.data.game
            this.props.history.push({ pathname: '/game', state: { game }})
        })
        .catch(err => alert('Error creating the game', err) )      
        
           
    }
        
    render() {
        return (

            <section id="login">
                <div className="container">

                    <header>
                        <h1>New game</h1>
                        <p>Enter your names to start the game.</p>
                    </header>
                
                    <form className="content" onSubmit={this.handleSubmit.bind(this)} >

                        <div>
                            <label htmlFor="player1" className="accent">Player One</label>
                            <input type="text" id="playerOne" placeholder="Player one name..." onChange={this.handleInput.bind(this)} required />
                        </div>

                        <div>
                            <label htmlFor="player2" className="accent">Player Two</label>
                            <input type="text" id="playerTwo" placeholder="Player two name..." onChange={this.handleInput.bind(this)} required />
                        </div>

                        <div>
                            <input type="submit" className="btn" value="Play" />
                        </div>

                    </form>

                </div>
            </section>

        )
    }
}
