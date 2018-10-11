import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import App from './App'

// Styles
import './css/btn.css'
import './css/form.css'
import './css/game.css'
import './css/master.css'
import './css/moves.css'
import './css/stats.css'
import './css/theme.css'
import './css/topbar.css'

// Pages
import Game from './pages/Game'
import Home from './pages/Home'
import Moves from './pages/Moves'

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

ReactDOM.render(

    <Router history={history}>

        <App>
            <Switch>
                <Route path="/game" component={Game} exact />
                <Route path="/moves" component={Moves} exact />
                <Route path="/" component={Home} />
            </Switch>
        </App>

    </Router>
    
, document.getElementById('root'));