import React, { Component } from 'react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import LastMatches from './LastMatches';
import PlayersStats from './PlayersStats';

export default class Stats extends Component {

    render() {
        return (
            <Router>
                <section id="stats" className="white-txt">
                    <div className="container">

                        <header>
                            <h1>Statistics</h1>
                            
                                <div id="stats-categories">
                                    <NavLink to="/lastmatches">Last matches</NavLink>
                                    <NavLink to="/playerstat">Player Stats</NavLink>
                                </div>
                        </header>

                        <div id="stat-results">
                            <Route path="/" component={LastMatches} exact />
                            <Route path="/lastmatches" component={LastMatches} exact />
                            <Route path="/playerstat" component={PlayersStats} exact  />
                        </div>
                        
                    </div>
                </section>
            </Router>
        )
    }
}
