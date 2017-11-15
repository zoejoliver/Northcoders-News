import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom' 
import Homepage from './Homepage';

class App extends React.Component {
    render () {
        return (
            <BrowserRouter>
                <section>
                    <div>
                        <Switch>
                            <Route exact path='/' component={Homepage}/>
                        </Switch>
                    </div>
                </section>
            </BrowserRouter>
        )
    }
}

export default App;