import React from 'react';
import {connect} from 'react-redux';
import {fetchComments, addComment, changeVote, removeComment} from '../actions';


class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
    this.voteClickHandler = this.voteClickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.removeHandler = this.removeHandler.bind(this);
  }
  componentDidMount() {
    const id = this.props.article_id;
    this.props.fetchComments(id);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.comments.length !== this.props.comments.length) {
      this.props.fetchComments(this.props.article_id);
    }
  }
  
  render () {
    return (
      <div className='main container-fluid'>  
        <div>
          {this.props.comments.map((comment) => {
            return (
              <div key={comment.created_at} className='comment-item'>
                <div className='row'>
                  <p className='comment-date'>{comment.created_at}</p>
                  <button className='comment-rmv-btn' id={comment._id} onClick={this.removeHandler}> remove </button>
                </div>
                <div className='row comment-body'>
                  <p className='comment-bod'>{comment.body}</p>
                  <p className='comment-author'>By {comment.created_by}</p>
                </div>
                <div className='votes'>
                  <p className='vote-num'>{comment.votes} votes</p>  
                  <input type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35608-200.png" name="up" onClick={this.voteClickHandler} className="btTxt submit" id={comment._id} />
                  <input type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35609-200.png" name="down" onClick={this.voteClickHandler} className="btTxt submit" id={comment._id} />
                </div>
              </div>
            );
          })}
          <div className = "comment-form">
            <form>
              <input value = {this.state.comment} className='add-comment-form' onChange={this.changeHandler} type='text' placeholder="Type your comment here..."></input>
              <br></br>
              <input className='submit-form' onClick={this.submitHandler} type='submit' value="Submit"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }

  removeHandler(e) {
    e.preventDefault();
    const id = e.target.id;
    this.props.removeComment(id);
  }
  voteClickHandler(e) {
    e.preventDefault();
    const mode = 'comment';
    const id = e.target.id;
    const input = e.target.name;
    this.props.changeVote(input, id, mode);
  }
  changeHandler(e) {
    this.setState({
      comment: e.target.value
    });
  }
  submitHandler(e) {
    e.preventDefault();
    const id = this.props.article_id;
    const comment = this.state.comment;
    this.props.addComment(id, comment);
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
  changeVote: (input, id, mode) => {
    dispatch(changeVote(input, id, mode));
  },
  addComment: (id, comment) => {
    dispatch(addComment(id, comment));
  },
  removeComment: (id) => {
    dispatch(removeComment(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);