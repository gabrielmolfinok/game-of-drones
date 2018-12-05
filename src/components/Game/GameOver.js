import React from 'react'
import { Link } from 'react-router-dom'
import * as gameActions from '../../controllers/games'

const GameOver = ( props, { winner } ) => {

    return (
        <div id="game-finished">
            <div className="container">
                
                <header align="center">
                    <img src="/img/icons/crown.svg" alt="crown" width="100" />
                    <h1>We have a winner!</h1>
                    <p><b>{winner}</b> is the new emperor!</p>
                    <button className="btn" onClick={props.refreshGame}>Play again</button>
                    <Link to="/" className="btn secondary">Volver a inicio</Link>
                </header>

            </div>
        </div>
    )

}

export default GameOver