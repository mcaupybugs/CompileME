import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Homepage from './pages/Homepage';
import ProblemPage from './pages/ProblemPage';
import CompilerPage from './pages/CompilerPage';

class App extends React.Component {


    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route path="/" exact component={Homepage} />
                            <Route path="/compiler" exact component={CompilerPage} />
                            <Route path="/question/:id" exact component={ProblemPage} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;