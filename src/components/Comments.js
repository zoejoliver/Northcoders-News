import React from 'react';
import {connect} from 'react-redux';
import {fetchComments, addComment} from '../actions';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.article_id;
    this.props.fetchComments(id);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.comments.length !== this.props.comments.length) {
      this.props.fetchComments(this.props.match.params.article_id);
    }
  }
  
  render () {
    return (
      <div>
        <h1>Comments</h1>
        
        {this.props.comments.map((comment) => {
          return (
            <div key={comment.created_at}>
              <p>{comment.created_at}</p>
              <p>{comment.body}</p>
              <p>{comment.created_by}</p>
              <p>{comment.votes}</p>
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

  changeHandler(e) {
    e.preventDefault();
    const input = e.target.value;
    console.log(input);
    this.setState({
      comment: input
    });
  }
  
  submitHandler(e) {
    e.preventDefault();
    const id = this.props.match.params.article_id;
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
  addComment: (id, comment) => {
    dispatch(addComment(id, comment));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);