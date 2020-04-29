import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Homepage from './pages/Homepage';

class App extends React.Component {


    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route path="/" exact component={Homepage} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;