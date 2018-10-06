import React, { Component } from 'react'

export default class Game extends Component {
  render() {

    const { state } = this.props.location

    return (
      <div>
        {state.playerOne.name}
        {state.playerTwo.name}
      </div>
    )
  }
}
