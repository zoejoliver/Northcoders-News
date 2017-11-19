import React from 'react';
import {connect} from 'react-redux';
import {changeVote, addComment} from '../actions';

class CommentVote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
    this.voteClickHandler = this.voteClickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  
  render () {
    return (
      <div>
        {this.props.comments.map((comment) => {
          return (
            <div key={comment.created_at}>
              <p>{comment.created_at}</p>
              <p>{comment.body}</p>
              <p>{comment.created_by}</p>
              <div className='votes'>
                <p>{comment.votes}</p>  
                <button id={comment._id} onClick={this.voteClickHandler} value='up'>up</button>
                <button id={comment._id} onClick={this.voteClickHandler} value='down'>down</button>
              </div>
            </div>
          );
        })}
        <div className = "comment-form">
          <form>
            <input onChange={this.changeHandler} type='text' placeholder="Type your comment here..."></input>
            <br></br>
            <input onClick={this.submitHandler} type='submit' value="Submit"></input>
          </form>
        </div>
      </div>
    );
  }


  voteClickHandler(e) {
    e.preventDefault();
    const id = e.target.id;
    const input = e.target.value;
    this.props.changeVote(input, id);
  }
  changeHandler(e) {
    e.preventDefault();
    const input = e.target.value;
    this.setState({
      comment: input
    });
  }
  
  submitHandler(e) {
    e.preventDefault();
    const id = this.props.article_id;
    const comment = this.state.comment;
    this.props.addComment(id, comment);
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (id, comment) => {
    dispatch(addComment(id, comment));
  },
  changeVote: (input, id) => {
    dispatch(changeVote(input, id));
  }
});

export default connect(null, mapDispatchToProps)(CommentVote);