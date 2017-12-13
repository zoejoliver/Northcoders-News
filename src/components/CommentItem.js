import React from 'react';
import {connect} from 'react-redux';
import {changeVote, removeComment} from '../actions/comments';
import PT from 'prop-types';
import moment from 'moment';

class CommentItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      votes: this.props.comment.votes
    };
    this.voteClickHandler = this.voteClickHandler.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
  }
  
  render () {
    const comment = this.props.comment;
      return (
        <div className='comment-item'>
            <div className='row'>
                <p className='comment-date'>{moment(comment.created_at).fromNow()}</p>
                <button className='comment-rmv-btn' name={comment.belongs_to} id={comment._id} onClick={this.removeHandler}> remove </button>
            </div>
            <div className='row comment-body'>
                <p className='comment-bod'>{comment.body}</p>
                <p className='comment-author'>By {comment.created_by}</p>
            </div>
            <div className='votes'>
                {(() => {
                  if (this.props.loading) {
                    return (
                      <p className='vote-num'>{this.state.votes} votes</p>
                    );
                  }
                  else {
                    return (
                      <p className='vote-num'>{comment.votes} votes</p>
                    );
                  } 
                })()}
                <input type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35608-200.png" name="up" onClick={this.voteClickHandler} className="vote-btn" id={comment._id} />
                <input type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35609-200.png" name="down" onClick={this.voteClickHandler} className="vote-btn" id={comment._id} />
            </div>
        </div>
      )
  }

  removeHandler (e) {
    e.preventDefault();
    const id = e.target.id;
    const article_id = e.target.name;
    this.props.removeComment(id, article_id);
  }
  voteClickHandler (e) {
    e.preventDefault();
    const article_id = this.props.article_id;
    const mode = 'comment';
    const id = e.target.id;
    const input = e.target.name;
    const prevVotes = this.props.comment.votes;
    let newVotes;
    if (input === 'up') newVotes = prevVotes + 1;
    else  newVotes = prevVotes - 1;
    this.setState({
      votes: newVotes
    })
    this.props.changeVote(input, id, mode, article_id);
  }
}
  
const mapStateToProps = state => ({
  comments: state.comments.data,
  loading: state.comments.loading,
  error: state.comments.error
});

const mapDispatchToProps = dispatch => ({
  changeVote: (input, id, mode, article_id) => {
    dispatch(changeVote(input, id, mode, article_id));
  },
  removeComment: (id, article_id) => {
    dispatch(removeComment(id, article_id));
  }
});

CommentItem.propTypes = {
  comments: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  changeVote: PT.func.isRequired,
  removeComment: PT.func.isRequired,
  article_id: PT.string.isRequired,
  match: PT.any.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);