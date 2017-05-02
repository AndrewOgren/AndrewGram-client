import { ActionTypes } from '../actions';


const PostsReducer = (state = { all: [], post: {} }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return Object.assign({}, state, {
        all: action.payload.posts.data,
      });
    case ActionTypes.FETCH_POST:
      return Object.assign({}, state, {
        post: action.payload.post.data,
      });
    default:
      return state;
  }
};

export default PostsReducer;
