import axios from 'axios';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

const ROOT_URL = 'https://ogren-blog.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser({ email, password, username }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password, username }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}


export function signupUser({ email, password, username }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      history.push('/');
    }).catch((error) => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signoutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}


export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`).then((response) => {
      dispatch({ type: 'FETCH_POSTS', payload: { posts: response } });
    }).catch((error) => {
      console.log('failure');
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then((response) => {
      dispatch({ type: 'FETCH_POST', payload: { post: response } });
    }).catch((error) => {
      console.log('failure');
    });
  };
}

export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      history.push('/');
    }).catch((error) => {
      console.log('failure');
    });
  };
}

export function updatePost(post, history) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${post._id}`, {
      title: post.title,
      tags: post.tags,
      content: post.content,
      cover_url: post.cover_url,
      username: post.username,
      author: post.author,
      comments: post.comments }, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
        history.push(`/post/:${post._id}`);
      }).catch((error) => {
        console.log('failure');
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      history.push('/');
    }).catch((error) => {
      console.log('failure');
    });
  };
}
