import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import Posts from './containers/Posts';
import NewPost from './containers/NewPost';
import Post from './containers/Post';
import './style.scss';

// this creates the store with the reducers, and does some other stuff to initialize devtools
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

const NavBar = (props) => {
  return (
    <nav>
      <ul className="navigationContainer">
        <li className="navItem"><NavLink className="navLink" to="/" exact> Posts </NavLink></li>
        <li id="mainTitle"> Andrew-Gram </li>
        <li className="navItem"><NavLink className="navLink" to="/posts/new"> Add </NavLink></li>
      </ul>
    </nav>
  );
};


const App = (props) => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route exact path="/post/:postID" component={Post} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>

  );
};


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('main'));
