import React, { Component } from 'react'
// import axios from 'axios'
import API from './api'

import * as userActions from './controllers/users'


export default class App extends Component {

    state = {
        playerOne: '',
        playerTwo: ''
    }

    handleInput = e => {
        if (e.target.id === 'playerOne') {
            let playerOne = e.target.value
            this.setState({ playerOne })
        } else {
            let playerTwo = e.target.value
            this.setState({ playerTwo })
        }
    }

    handleSubmit = e => {

        e.preventDefault()

        const user = {
            name: this.state.playerOne
        }

        // Aqui logueo de participantes...
        userActions.addUser(user)
        
           
    }

    componentDidMount = () => {
        API.get(`api/users`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    

    render() {



        return (
        <div>

            <section>
                <div className="container">

                    <header>
                        <h1>Game of Drones</h1>
                        <p>Enter your names to start the game.</p>
                    </header>
                
                    <form className="content" onSubmit={this.handleSubmit.bind(this)} >

                        <div>
                            <label htmlFor="player1">Player One</label>
                            <input type="text" id="playerOne" placeholder="Player one name..." onChange={this.handleInput.bind(this)} required />
                        </div>

                        <div>
                            <label htmlFor="player2">Player Two</label>
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
