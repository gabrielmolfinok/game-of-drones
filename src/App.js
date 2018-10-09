import React, { Component } from 'react'

import Topbar from './components/Topbar'


export default class App extends Component {

    render() {

        return (
            <div>

                <Topbar />

                <div id="main">
                    {this.props.children}
                </div>

            </div>
        )
    }
}
