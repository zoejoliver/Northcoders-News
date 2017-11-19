import React from 'react';
import {connect} from 'react-redux';
import {fetchComments, addComment} from '../actions';
import CommentVote from './CommentVote';

class Comments extends React.Component {

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
        <h1>Comments </h1>  
        <CommentVote comments={this.props.comments} article_id={this.props.match.params.article_id}/>
      </div>
    );
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);