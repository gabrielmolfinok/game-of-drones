import React, { Component } from 'react'

import Login from './../components/Login'
import Stats from './../components/Stats'

export default class Home extends Component {
    render() {
        return (
            
            <div className="container" align="center">

                <Login history={this.props.history} />

                <Stats />                
            
            </div>
        
        )
    }
}
