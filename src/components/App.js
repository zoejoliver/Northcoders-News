import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom' 
import Homepage from './Homepage';
import NoMatch from './NoMatch';
import ArticleList from './ArticleList';
import ArticleItem from './ArticleItem';
import Comments from './Comments';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <BrowserRouter>
                <section>
                    <div>
                        <Switch>
                            <Route exact path='/' component= {Homepage}/>
                            <Route path='/topics/:topic/articles' component= {ArticleList}/>
                            <Route path='/articles' component= {ArticleList}/>
                            <Route path='/articles/:article' component= {ArticleItem}/>
                            <Route path='/articles/:article/comments' component= {Comments}/>
                            <Route component= {NoMatch}/>
                        </Switch>
                    </div>
                </section>
            </BrowserRouter>
        )
    }
}

export default App;