import React, { Component } from 'react'

import * as userActions from './../controllers/users'
import * as gameActions from './../controllers/games'

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
                    // Usuario creado y lo manda al this.state
                    .then(res => { game.playerOne = res.data.user })
                    .catch(err => 
                        // Usuario ya existe...
                        console.log('El usuario 1 ya existe') )

        userActions.addUser(game.playerTwo)
                    .then(res => { game.playerTwo = res.data.user })
                    .catch(err => console.log('El usuario 2 ya existe') )

        gameActions.addGame(game.playerOne, game.playerTwo)
                    .then(res => {
                        let game = res.data.game
                        this.props.history.push({ pathname: '/game', state: { game }})
                    })
                    .catch(err => alert('Hubo error al crear el juego'))      
        
           
    }

    componentDidMount = () => {
        userActions.getAllUsers()
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
    }
        
    render() {
        return (
            <div className="container">

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
                                <input type="submit" className="btn"/>
                            </div>

                        </form>

                    </div>
                </section>
                
            </div>
        )
    }
}
