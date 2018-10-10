import React, { Component } from 'react'

export default class MovesList extends Component {

    render() {

        const { moves, click } = this.props

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

}
