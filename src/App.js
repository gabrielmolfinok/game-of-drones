import React, { Component } from 'react'

import Topbar from './components/Topbar'


export default class App extends Component {

    render() {

        return (
            <div>

                <Topbar />
                
                {this.props.children}

            </div>
        )
    }
}
