import React, { Component } from 'react'

import * as gameActions from './../../controllers/games'

export default class PlayersStats extends Component {

    state = { message: '' }

    getPlayerStats = e => {

        e.preventDefault()
        
        this.setState({ message: 'Searching...' })

        let search = document.getElementById('name').value

        if (search.length > 0) {

            gameActions.getPlayerWons(search)
                .then( res => this.setState({ data: res.data }) )
                .catch( err => this.setState({ data: undefined }) )

        }

    }

    handleResults() {

        if (this.state.data.ok) {
            
            return (
    
                <div id="player-results">
                    <article>
                        <h3>Created at </h3>
                        <p>{this.state.data.player.created}</p>
                    </article>
    
                    <article>
                        <h3>Games played </h3>
                        <p>{this.state.data.player.played}</p>
                    </article>
    
                    <article>
                        <h3>Games won </h3>
                        <p>{this.state.data.player.wins}</p>
                    </article>
                </div>
    
            )
            
        } else {

            return (
    
                <div id="player-results">
                    <article>
                        <h3>No results</h3>
                    </article>
                </div>
    
            )

        }
    }

    render() {
        return (
            <form id="player-finder" className="white-txt content" onSubmit={this.getPlayerStats.bind(this)}>

                <input id="name" type="text" placeholder="Type here and press Enter" required autoComplete="off" />

                { (this.state.data) ? this.handleResults() : <p className="content">{this.state.message}</p> }
                
            </form>
        )
    }
}
