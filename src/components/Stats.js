import React, { Component } from 'react'

import * as userActions from './../controllers/users'
import * as gameActions from './../controllers/games'

export default class Stats extends Component {

    state = {
        games: [],
        players: []
    }

    getResults() {
        if (this.state.games.length > 0) {
            return this.renderLastGames()
        } else {
            return this.renderTopPlayers()
        }
    }

    getLastGames() {
        gameActions.getAllGames()   
        .then(res => {
            this.setState({
                games: res.data.games,
                player: []
            })
        })
        .catch(err => console.log(err))                             
    }

    getTopPlayers() {

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

            return (
                <div className="content" id="stats-results">
                    {this.state.players.map((player, i) => (
                        <article>
                            <h4>{player.name}</h4>
                            <p></p>
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
                        <a href="#" onClick={this.getLastGames.bind(this)} className="active">Last matches</a>
                        <a href="#" onClick={this.getTopPlayers.bind(this)} >Top Players</a>
                    </header>

                    <div id="stat-results">
                        {(this.state.games.length > 0) ? this.renderLastGames() : this.renderTopPlayers()}
                    </div>

                    {/* { (this.shouldComponentUpdate()) ? this.getResults() : null } */}
                    
                </div>
            </section>
        )
    }
}
