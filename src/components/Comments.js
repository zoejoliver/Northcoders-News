import React from 'react';
import {connect} from 'react-redux';
import {fetchComments, addComment, removeComment} from '../actions/comments';
import PT from 'prop-types';
import Loading from './Loading';
import CommentItem from './CommentItem';

class Comments extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      comment: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
  }
  componentDidMount () {
    let id;
    if (this.props.article_id) {
      id = this.props.article_id;
    }
    else id = this.props.match.params.article_id;
    this.props.fetchComments(id);
  }
  
  render () {
    if (this.props.comments.length > 0) {
      return (
        <div className='main container-fluid'>  
          <div>
            <div className = "comment-form">
              <input value = {this.state.comment} className='add-comment-form' onChange={this.changeHandler} type='text' placeholder="Type your comment here..."></input>
              <input className='submit-form' onClick={this.submitHandler} type='submit' value="Submit"></input>
            </div>
            {this.props.comments.map((comment) => {
              return (
                <CommentItem 
                key={comment.created_at}
                loading = {this.props.loading}
                comment = {comment}
                article_id = {comment.belongs_to}
                />
              );
            })}
          </div>
        </div>
      );
    }
    else {
      return (
        <Loading />
      );
    }
  }

  removeHandler (e) {
    e.preventDefault();
    const id = e.target.id;
    const article_id = e.target.name;
    this.props.removeComment(id, article_id);
  }
  changeHandler (e) {
    this.setState({
      comment: e.target.value
    });
  }
  submitHandler (e) {
    let article_id;
    if (this.props.article_id) {
      article_id = this.props.article_id;
    }
    else article_id = this.props.match.params.article_id;
    e.preventDefault();
    const comment = this.state.comment;
    this.props.addComment(article_id, comment);
    this.setState({
      comment: ''
    });
  }
}
  
const mapStateToProps = state => ({
  comments: state.comments.data,
  loading: state.comments.loading,
  error: state.comments.error
});

const mapDispatchToProps = dispatch => ({
  fetchComments: (id) => {
    dispatch(fetchComments(id));
  },
  addComment: (article_id, comment) => {
    dispatch(addComment(article_id, comment));
  },
  removeComment: (id, article_id) => {
    dispatch(removeComment(id, article_id));
  }
});

Comments.propTypes = {
  comments: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchComments: PT.func.isRequired,
  addComment: PT.func.isRequired,
  removeComment: PT.func.isRequired,
  article_id: PT.string.isRequired,
  match: PT.any.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);