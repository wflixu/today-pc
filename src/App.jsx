import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import Home from './components/Home';
import ControlPanel from './pages/ControlPanel';
import Todo from './pages/TodoApp';
import NoMatch from './components/NoMatch';
import Header from './components/Header';
import './App.css';




const App = ({ history }) => {
    return (
        <ConnectedRouter history={history}>
            {(
                <div className="main">
                    <Header />
                    <section>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/todo" component={Todo} />
                            <Route path="/counter" component={ControlPanel} />
                            <Route component={NoMatch} />
                        </Switch>
                    </section>
                </div>
            )}
        </ConnectedRouter>
    )
}

App.propTypes = {
    history: PropTypes.object,
}

export default App