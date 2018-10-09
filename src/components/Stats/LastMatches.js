import React, { Component } from 'react'

import * as gameActions from './../../controllers/games'

export default class LastMatches extends Component {

    getLastMatches() {

        gameActions.getAllGames()   
            .then(res => {
                this.setState({ lastMatches: res.data.games })
            })
            .catch(err => console.log(err))

    }

    renderLastMatches() {

        if (this.state.lastMatches.length > 0) {
            return (
                <div>
                    {this.state.lastMatches.map((game, i) => (
                        <article key={i}>
                            <h4>{game.playerOne}</h4>
                            <p className="white-txt"> {game.pOneScore} : {game.pTwoScore} </p>
                            <h4>{game.playerTwo}</h4>
                        </article>
                    ))}
                </div>
            )
        }

        return (
            <div>
                <p>No games played yet</p>
            </div>
        )

    }

    componentWillMount = () => {
        this.getLastMatches()
    }
    

    render() {

        return (
            <div className="content" id="stats-results">
                {(this.state) ? this.renderLastMatches() : (<p>Loading...</p>)}                
            </div>
        )
    }
}
