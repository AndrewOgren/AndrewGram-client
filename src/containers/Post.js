import React, { Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import { withRouter, NavLink } from 'react-router-dom';
import Textarea from 'react-textarea-autosize';
import { fetchPost, deletePost, updatePost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingCover: false,
      editingTitle: false,
      editingContent: false,
      editingTags: false,
      currentContent: '',
      currentComment: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderEditing = this.renderEditing.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.postID;
    const rightId = id.substring(1, id.length);
    this.props.fetchPost(rightId);
  }


  onInputChange(event) {
    this.setState({
      currentContent: event.target.value,
    });
  }

  onCommentChange(event) {
    console.log(event.target.value);
    this.setState({
      currentComment: event.target.value,
    });
  }

  addComment() {
    console.log('adding comment');
    const singlePost = (this.props.posts.post);
    singlePost.comments.push(`${this.state.currentComment} -${singlePost.username}`);
    this.props.updatePost(singlePost, this.props.history);
  }

  handleClick(id) {
    switch (id) {
      case 'cover_url':
        this.setState({
          editingCover: true,
          editingTitle: false,
          editingContent: false,
          editingTags: false,
        });
        break;
      case 'title':
        this.setState({
          editingCover: false,
          editingTitle: true,
          editingContent: false,
          editingTags: false,
        });
        break;
      case 'content':
        this.setState({
          editingCover: false,
          editingTitle: false,
          editingContent: true,
          editingTags: false,
        });
        break;
      case 'tags':
        this.setState({
          editingCover: false,
          editingTitle: false,
          editingContent: false,
          editingTags: true,
        });
        break;
      default:
        this.setState({
          editingCover: false,
          editingTitle: false,
          editingContent: false,
          editingTags: false,
        });
        break;
    }
  }

  doneEditing() {
    console.log('called done');
    const singlePost = (this.props.posts.post);
    if (this.state.editingCover) {
      singlePost.cover_url = this.state.currentContent;
      this.setState({
        editingCover: false,
        currentContent: '',
      });
    } else if (this.state.editingTitle) {
      singlePost.title = this.state.currentContent;
      this.setState({
        editingTitle: false,
        currentContent: '',
      });
    } else if (this.state.editingContent) {
      singlePost.content = this.state.currentContent;
      this.setState({
        editingContent: false,
        currentContent: '',
      });
    } else if (this.state.editingTags) {
      singlePost.tags = this.state.currentContent;
      this.setState({
        editingTags: false,
        currentContent: '',
      });
    }
    console.log(singlePost);
    this.props.updatePost(singlePost, this.props.history);
  }

  renderEditing(type) {
    const singlePost = (this.props.posts.post);
    let jsxToReturn = null;
    switch (type) {
      /* eslint-disable react/no-danger */
      case 'cover_url':
        if (this.state.editingCover) {
          jsxToReturn = (<Textarea className="textArea" onChange={this.onInputChange}
            onBlur={this.doneEditing} value={this.state.currentContent}
          />);
        } else {
          jsxToReturn = (<div onClick={() => this.handleClick('cover_url')} className="single_cover_url">
            <img className="single_image" alt="" src={singlePost.cover_url} />
          </div>);
        }
        break;
      case 'title':
        if (this.state.editingTitle) {
          jsxToReturn = (<Textarea className="textArea" onChange={this.onInputChange}
            onBlur={this.doneEditing} value={this.state.currentContent}
          />);
        } else {
          jsxToReturn = (<div onClick={() => this.handleClick('title')} className="single_title"
            dangerouslySetInnerHTML={{ __html: marked(singlePost.title || '') }}
          />);
        }
        break;
      case 'content':
        if (this.state.editingContent) {
          jsxToReturn = (<Textarea className="textArea" onChange={this.onInputChange}
            onBlur={this.doneEditing} value={this.state.currentContent}
          />);
        } else {
          jsxToReturn = (<div onClick={() => this.handleClick('content')} className="single_content"
            dangerouslySetInnerHTML={{ __html: marked(singlePost.content || '') }}
          />);
        }
        break;
      case 'tags':
        if (this.state.editingTags) {
          jsxToReturn = (<Textarea className="textArea" onChange={this.onInputChange}
            onBlur={this.doneEditing} value={this.state.currentContent}
          />);
        } else {
          jsxToReturn = (<div onClick={() => this.handleClick('tags')} className="single_tags"
            dangerouslySetInnerHTML={{ __html: marked(singlePost.tags || '') }}
          />);
        }
        break;
      default:
        break;
    }
    return jsxToReturn;
  }

  render() {
    const id = this.props.match.params.postID;
    const rightId = id.substring(1, id.length);
    const singlePost = this.props.posts.post;
    let c = null;
    if (singlePost.comments) {
      c = singlePost.comments.map((comment) => {
        return (<li key={comment} className="commentItem" dangerouslySetInnerHTML={{ __html: marked(comment || '') }} />);
      });
    }
    console.log(c);

    return (
      <nav>
        <ul className="postNavContainer">
          <li className="postNavItem"><NavLink className="navLink" to="/">Back to Posts</NavLink></li>
          <li id="deleteBtn" onClick={() => this.props.deletePost(rightId, this.props.history)} className="postNavItem">Delete</li>
        </ul>
        <div className="singlePostContainer">
          <div className="singlePostItem">
            {this.renderEditing('cover_url')}
            {this.renderEditing('title')}
            <div className="single_username" dangerouslySetInnerHTML={{ __html: marked(`By: ${singlePost.username}` || '') }} />
            {this.renderEditing('content')}
            {this.renderEditing('tags')}
            <ul className="commentContainer">
              {c}
            </ul>
            <div className="addCommentContainer">
              <Textarea id="commentInput" onChange={this.onCommentChange} placeholder="Add Comment" value={this.state.currentComment} />
              <input id="commentBtn" onClick={this.addComment} type="button" value="Comment" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

}

const mapStateToProps = state => (
  {
    posts: state.posts,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post));
