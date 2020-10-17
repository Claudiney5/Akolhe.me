import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import Landing from './pages/Landing'
import Footholds from './pages/Footholds'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Landing } />
                <Route path="/app" component={ Footholds } />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes