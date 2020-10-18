import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import Landing from './pages/Landing'
import Footholds from './pages/Footholds'
import Foothold from './pages/Foothold'
import CreateFoothold from './pages/CreateFoothold'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Landing } />
                <Route path="/app" component={ Footholds } />
                <Route path="/footholds/create" component={ CreateFoothold } />
                <Route path="/footholds/:id" component={ Foothold } />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes