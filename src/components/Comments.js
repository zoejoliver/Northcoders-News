import React from 'react';
import {connect} from 'react-redux';
import {fetchComments, addComment, changeVote} from '../actions';


class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
    this.voteClickHandler = this.voteClickHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
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
                <p>{comment.created_at}</p>
                <p className='comment-bod'>{comment.body}</p>
                <p className='comment-author'>By {comment.created_by}</p>
                <div className='votes'>
                  <p>{comment.votes}</p>  
                  <input type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35608-200.png" name="up" onClick={this.voteClickHandler} className="btTxt submit" id={comment._id} />
                  <input type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35609-200.png" name="down" onClick={this.voteClickHandler} className="btTxt submit" id={comment._id} />
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
      </div>
    );
  }

  voteClickHandler(e) {
    e.preventDefault();
    const mode = 'comment';
    const id = e.target.id;
    const input = e.target.name;
    this.props.changeVote(input, id, mode);
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);