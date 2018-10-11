
import React from 'react'

export default ({ moves, click }) => {
  
    return (

        <div id="game-moves" className="content">

            { moves.map((move, i) => (

                <article className="move" key={i} onClick={click.bind(this, move)}>
                    <h2>{move.name}</h2>
                </article>

            )) }

        </div>

    )

}

