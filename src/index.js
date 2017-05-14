import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { ActionTypes } from './actions';
import reducers from './reducers';
import Posts from './containers/Posts';
import NewPost from './containers/NewPost';
import Post from './containers/Post';
import SignInOrSignUp from './containers/SignInOrSignUp';
import NavBar from './containers/NavBar';
import RequireAuth from './containers/requireAuth';
import './style.scss';

// this creates the store with the reducers, and does some other stuff to initialize devtools
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER });
}

const App = (props) => {
  /* eslint-disable */
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={RequireAuth(NewPost)} />
          <Route exact path="/post/:postID" component={Post} />
          <Route path="/signup" component={SignInOrSignUp} />
          <Route path="/signin" component={SignInOrSignUp} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
    /* eslint-enable */
  );
};


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('main'));
