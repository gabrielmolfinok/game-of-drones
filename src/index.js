import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import App from './App'

// Styles
import './css/btn.css'
import './css/form.css'
import './css/game.css'
import './css/login.css'
import './css/master.css'
import './css/stats.css'
import './css/theme.css'
import './css/topbar.css'

// Pages
import Home from './pages/Home'
import Game from './pages/Game'

import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

ReactDOM.render(

    <Router history={history}>

        <App>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/game" component={Game} exact />
            </Switch>
        </App>

    </Router>
    
, document.getElementById('root'));