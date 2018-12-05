import React, { Component } from 'react'

import * as userActions from '../controllers/users'

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

        let pOneInput = document.getElementById('pOne').value
        let pTwoInput = document.getElementById('pTwo').value

        if (pOneInput === pTwoInput)
            return window.alert('Insert different players')        

        userActions.addUser(pOneInput)
        .then(res => console.log(res))

        userActions.addUser(pTwoInput)
        .then(res => console.log(res))     
        
        this.props.history.push({ pathname: `/game`, state: { pOne: pOneInput, pTwo: pTwoInput} })        
           
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
                            <label htmlFor="pOne" className="accent">Player One</label>
                            <input type="text" id="pOne" placeholder="Player one name..." required />
                        </div>

                        <div>
                            <label htmlFor="pTwo" className="accent">Player Two</label>
                            <input type="text" id="pTwo" placeholder="Player two name..." required />
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
