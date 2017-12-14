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
      comment: '',
      loadingFlag: false,
      commentList: this.props.comments
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
  componentWillReceiveProps (nextProps) {
    if (nextProps.comments.length !== this.props.comments.length) {
      this.setState({
        loadingFlag: false
      })
    }
  }
  render () {
    let comments;
    if (this.state.loadingFlag) {
      comments = this.state.commentList;
    }
    else {
      comments = this.props.comments;
    }
    if (comments.length) {
      return (
        <div className='main container-fluid'>  
          <div>
            <div className = "comment-form">
              <input value = {this.state.comment} className='add-comment-form' onChange={this.changeHandler} type='text' placeholder="Type your comment here..."></input>
              <input className='submit-form' onClick={this.submitHandler} type='submit' value="Submit"></input>
            </div>
            {comments.map((comment) => {
              return (
                <CommentItem 
                key={comment.created_at}
                loading = {this.props.loading}
                comment = {comment}
                article_id = {comment.belongs_to}
                removeHandler = {this.removeHandler}
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
  // const newComment = [{
  //   body: comment,
  //   belongs_to: article_id,
  //   created_by: 'northcoder',
  //   votes: 0,
  //   created_at: Date.now()
  // }]
  // const prevComments = this.props.comments;
  // const newComments = newComment.concat(prevComments);

  // this.setState({
  //   commentList: newComments
  // })
  removeHandler (e) {
      e.preventDefault();
      const id = e.target.id;
      const article_id = e.target.name;

      const prevComments = this.props.comments;
      let index;
      prevComments.map((comment, i) => {
        if (comment._id === id) index = i;
      })
      const newComments = prevComments.slice(0,index).concat(prevComments.slice(index + 1));
  
      this.setState({
        commentList: newComments,
        loadingFlag: true
      })
      this.props.removeComment(id, article_id);      
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
    dispatch(removeComment(id, article_id))
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