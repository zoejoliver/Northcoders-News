import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 
import Homepage from './Homepage';
import NoMatch from './NoMatch';
import ArticleList from './ArticleList';
import ArticleItem from './ArticleItem';
import NavBar from './NavBar';
import Comments from './Comments';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <BrowserRouter>
        <section>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path='/' component= {Homepage}/>
              <Route exact path='/:topic' component= {ArticleList}/>
              <Route exact path='/articles' component= {ArticleList}/>
              <Route exact path='/articles/:article_id' component= {ArticleItem}/>
              <Route path='/articles/:article_id/comments' component= {Comments}/>
              <Route component= {NoMatch}/>
            </Switch>
          </div>
        </section>
      </BrowserRouter>
    );
  }
}

export default App;