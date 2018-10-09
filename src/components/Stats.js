import React, { Component } from 'react'

import LastMatches from './Stats/LastMatches';

export default class Stats extends Component {

    handleStatClick = e => {
        let statsCategories = (e.target.parentElement).children
        
        for (let i = 0; i < statsCategories.length; i++) {
            statsCategories[i].classList.remove('active')
        }
        e.target.classList.add('active')        
    }

    render() {
        return (
            <section id="stats" className="white-txt">
                <div className="container">

                    <header>
                        <h1>Statistics</h1>
                        <div id="stats-categories">
                            <button onClick={this.handleStatClick.bind(this)} className="active">Last matches</button>
                            <button onClick={this.handleStatClick.bind(this)} >Top Players</button>
                        </div>
                    </header>

                    <div id="stat-results">
                        <LastMatches />
                    </div>
                    
                </div>
            </section>
        )
    }
}
