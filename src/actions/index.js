import axios from 'axios';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=a_ogren';


export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      console.log('the response': response);
      dispatch({ type: 'FETCH_POSTS', payload: { posts: response } });
    }).catch((error) => {
      console.log('failure');
    });
  };
}

export function fetchPost(id) {
  console.log(`${ROOT_URL}/posts/${id}${API_KEY}`);
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      console.log('the response');
      console.log(response);
      dispatch({ type: 'FETCH_POST', payload: { post: response } });
    }).catch((error) => {
      console.log('failure');
    });
  };
}

export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post).then((response) => {
      console.log('success');
      history.push('/');
    }).catch((error) => {
      console.log('failure');
    });
  };
}

export function updatePost(post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${post._id}${API_KEY}`, {
      title: post.title,
      tags: post.tags,
      content: post.content,
      cover_url: post.cover_url }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log('failure');
      });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      console.log('success');
      history.push('/');
    }).catch((error) => {
      console.log('failure');
    });
  };
}
