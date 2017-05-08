import React, { Component } from 'react';
import AlertContainer from 'react-alert';
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
      comments: [],
    };

    this.alertOptions = {
      offset: 14,
      position: 'top right',
      theme: 'dark',
      time: 0,
      transition: 'scale',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onCoverURLChange = this.onCoverURLChange.bind(this);
    this.checkBeforePosting = this.checkBeforePosting.bind(this);
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

  checkBeforePosting() {
    /* eslint-disable no-alert*/

    if (this.state.title === '') {
      this.showAlert('Title must be filled out');
    } else if (this.state.tags === '') {
      this.showAlert('You must supply at least one tag.');
    } else if (this.state.content === '') {
      this.showAlert('Content must be filled out');
    } else if (this.state.cover_url === '') {
      this.showAlert('Cover URL must be filled out');
    } else {
      this.props.createPost(this.state, this.props.history);
    }
  }

/* eslint-disable class-methods-use-this*/
  showAlert(text) {
    global.msg.show(<p id="alertText">{text}</p>, {
      time: 0,
      type: 'error',
      icon: <i id="warningIcon" className="fa fa-exclamation-triangle fa-4x" />,
    });
  }

  render() {
    /* eslint-disable no-return-assign */
    return (
      <div>
        <AlertContainer id="customAlert" ref={a => global.msg = a} {...this.alertOptions} />
        <form className="NewPostContainer">
          <input id="title" onChange={this.onTitleChange} type="text" placeholder="title" value={this.state.title} />
          <input onChange={this.onTagsChange} type="text" placeholder="tags" value={this.state.tags} />
          <input onChange={this.onContentChange} type="text" placeholder="content" value={this.state.content} />
          <input onChange={this.onCoverURLChange} type="text" placeholder="cover url" value={this.state.cover_url} />
          <div>
            <button type="button" id="createPostButton" onClick={this.checkBeforePosting}>Create </button>
          </div>
        </form>
      </div>
    );
  }
}


export default withRouter(connect(null, { createPost })(NewPost));
