import React, { Component } from 'react'

import * as userActions from './../controllers/users'
import * as gameActions from './../controllers/games'

export default class Stats extends Component {

    state = {
        games: [],
        players: [],
        playersWins: []
    }

    handleStatClick = e => {

        try {

            let statsCategories = (e.target.parentElement).children
        
            for (let i = 0; i < statsCategories.length; i++) {
                
                statsCategories[i].classList.remove('active')
                
            }

            e.target.classList.add('active')

        } catch (error) {
            
        }
        
    }

    getResults() {
        if (this.state.games.length > 0) {
            return this.renderLastGames()
        } else {
            return this.renderTopPlayers()
        }
    }

    getLastGames = e => {

        this.handleStatClick(e)

        gameActions.getAllGames()   
        .then(res => {
            this.setState({
                games: res.data.games,
                players: []
            })
        })
        .catch(err => console.log(err))                             
    }

    getTopPlayers = e => {

        this.handleStatClick(e)

        userActions.getAllUsers()   
        .then(res => {
            this.setState({
                games: [],
                players: res.data.users
            })
        })
        .catch(err => console.log(err))

        this.renderLastGames()

        // Aqui se obtienen todos los usuarios, ordenados por la cantidad de partidos ganados

    }

    renderLastGames() {

        if (this.state.games.length > 0) {

            return (
                <div className="content" id="stats-results">
                    {this.state.games.map((game, i) => (
                        <article key={i}>
                            <h4>{game.playerOne}</h4>
                            <p className="white-txt"> {game.pOneScore} : {game.pTwoScore} </p>
                            <h4>{game.playerTwo}</h4>
                        </article>
                    ))}
                </div>
            )

        }
    }


    renderTopPlayers() {
        if (this.state.players.length > 0) {

            // gameActions.getPlayerWons(this.state.players[i].name)
            // .then(res => {

            //     let playerWins = {
            //         name: this.state.players[i].name,
            //         wins: res.data.count
            //     }

            //     console.log(res.data);
                
            //     this.setState(prevState => ({
            //         playersWins: [...prevState.playersWins, playerWins]
            //     }))

            // })

            return (
                <div className="content" id="stats-results">
                    {this.state.playersWins.map((player, i) => (
                        <article>
                            <h4>{player.name}</h4>
                            <p>{player.wins}</p>
                        </article>
                    ))}
                </div>
            )
            
        }
    }

    componentDidMount = () => {
        this.getLastGames()
    }    

    render() {
        return (
            <section id="stats" className="white-txt">
                <div className="container">

                    <header>
                        <h1>Statistics</h1>
                        <div id="stats-categories">
                            <div onClick={this.getLastGames.bind(this)} className="active">Last matches</div>
                            <div onClick={this.getTopPlayers.bind(this)} >Top Players</div>
                        </div>
                    </header>

                    <div id="stat-results">
                        {(this.state.games.length > 0) ? this.renderLastGames() : this.renderTopPlayers()}
                    </div>
                    
                </div>
            </section>
        )
    }
}
