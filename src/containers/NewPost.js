import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../actions';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      content: '',
      cover_url: '',
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onCoverURLChange = this.onCoverURLChange.bind(this);
  }

  onTitleChange(event) {
    console.log(event.target.value);
    this.setState({
      title: event.target.value,
    });
  }

  onTagsChange(event) {
    console.log(event.target.value);
    this.setState({
      tags: event.target.value,
    });
  }

  onContentChange(event) {
    console.log(event.target.value);
    this.setState({
      content: event.target.value,
    });
  }

  onCoverURLChange(event) {
    console.log(event.target.value);
    this.setState({
      cover_url: event.target.value,
    });
  }

  render() {
    return (
      <form className="NewPostContainer">
        <input id="title" onChange={this.onTitleChange} type="text" placeholder="title" value={this.state.title} />
        <input onChange={this.onTagsChange} type="text" placeholder="tags" value={this.state.tags} />
        <input onChange={this.onContentChange} type="text" placeholder="content" value={this.state.content} />
        <input onChange={this.onCoverURLChange} type="text" placeholder="cover url" value={this.state.cover_url} />
        <div>
          <button type="button" id="createPostButton" onClick={() => this.props.createPost(this.state, this.props.history)}>Create </button>
        </div>
      </form>
    );
  }
}


export default withRouter(connect(null, { createPost })(NewPost));
