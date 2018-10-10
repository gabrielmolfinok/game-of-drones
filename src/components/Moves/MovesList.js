
import React, { Component } from 'react';

import * as moveActions from './../../controllers/moves'

export default class MovesList extends Component {

    addNewMove = e => {

        e.preventDefault()

        let name = document.getElementById('newMoveName').value
        let kills = document.getElementById('newMoveKills').value

        moveActions.addMove(name, kills)
        .then( alert(`${name.charAt(0).toUpperCase() + name.slice(1)} added! `) )

        document.getElementById('newMoveName').value = ''

        console.log(document.getElementById('newMoveName').value);

        return

    }

    editMoveName = (move, e) => {

        e.preventDefault()

        let newName = document.getElementById('editMoveName').value.toLowerCase()

        moveActions.editMoveName(move, newName)
        .then( alert(`${move.name.charAt(0).toUpperCase() + move.name.slice(1)} now is ${newName.charAt(0).toUpperCase() + newName.slice(1)} `) )

    }

    editMoveKills = (move, e) => {

        let newKills = (e.target.value).toLowerCase()

        moveActions.editMoveKills(move, newKills)
        .then( alert(`${move.name.charAt(0).toUpperCase() + move.name.slice(1)} now kills ${newKills.charAt(0).toUpperCase() + newKills.slice(1)} `) )

    }

    deleteMove = (move, e) => {

        let moveName = move.name.charAt(0).toUpperCase() + move.name.slice(1)

        let confirm = window.confirm(`Are you sure you want to delete ${moveName}?`)

        if (confirm) {
            moveActions.deleteMove(move)
            .then( alert(`${moveName} deleted `) )            
        }


    }

    componentDidMount() {

        let select = document.getElementsByClassName('kills')

        for (let i = 0; i < select.length; i++) {
            
            select[i].value = select[i].id.charAt(0).toUpperCase() + select[i].id.slice(1)
            
        }

    }
    

    render() {

        const { moves } = this.props

        return (

            <div>

                { moves.map((move, i) => (

                    <form onSubmit={this.editMoveName.bind(this, move)} key={i}>
                        <div>

                            <div className="input-zone">
                                <input type="text" id="editMoveName" defaultValue={move.name} />
                                <img src="/img/icons/delete.svg" alt="delete" width="25" onClick={this.deleteMove.bind(this, move)} />
                            </div>

                            <h3>Kills: </h3>
                            <select className="kills" id={move.kills} move={move} onChange={this.editMoveKills.bind(this, move)}>
                                {moves.map((move, i) => (
                                    <option key={i}>{move.name.charAt(0).toUpperCase() + move.name.slice(1)}</option>                            
                                ))}
                            </select> 

                        </div>                       
                    </form>

                )) }

                <form onSubmit={this.addNewMove.bind(this)}>
                    <div>

                        <div className="input-zone">
                            <input id="newMoveName" type="text" placeholder="New move..." autoComplete="off" required />
                        </div>

                        <h3>Kills: </h3>
                        <select id="newMoveKills" >
                            {moves.map((move, i) => (
                                <option key={i}>{move.name.charAt(0).toUpperCase() + move.name.slice(1)}</option>
                            ))}
                        </select>
                        <input type="submit" style={{ display: 'none' }} />

                    </div>
                </form>

            </div>

            
    
        )
    }

}
