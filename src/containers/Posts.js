import React, { Component } from 'react';
import marked from 'marked';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { fetchPosts } from '../actions';


class Posts extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }


  render() {
    console.log(this.props.posts.all);
    const Pat = this.props.posts.all.map((post) => {
      /* eslint-disable react/no-danger */
      const postLink = `/post/:${post.id}`;

      return (
        <NavLink className="navLink" to={postLink} key={post.id}>
          <div className="postItem">
            <div className="cover_url">
              <img className="image" alt="" src={post.cover_url} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: marked(post.title || '') }} className="title" />
            <div dangerouslySetInnerHTML={{ __html: marked(post.tags || '') }} className="tags" />
          </div>
        </NavLink>
      );
    });
    return (
      <div className="postsContainer">
        { Pat }
      </div>

    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
