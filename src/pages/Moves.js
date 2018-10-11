import React, { Component } from 'react'

import * as moveActions from './../controllers/moves'

import MovesList from './../components/Moves/MovesList'

export default class Moves extends Component {

    state = { moves: [] }
    
    _isMounted = false

    getMoves() {
        moveActions.getAllMoves()
        .then(res => {
            if (this._isMounted) {
                this.setState({ moves: res.data.moves })                
            }
        })

        if (this.state.moves.length > 0) {
            return <MovesList moves={this.state.moves} />
        }

        return <h3>Loading...</h3>
    }

    componentDidMount() {
      this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
      }
    

    render() {
        return (

            <section align="center">

                <section id="moves">
                    <div className="container">
                    
                        <header>
                            <h1>Moves settings</h1>
                            <p>Here you will be able to modify the moves available in the game.</p>
                        </header>

                        <div className="content">
                            {this.getMoves()}
                        </div>

                    </div>            
                </section>

            </section>
            
        
        )
    }

}
