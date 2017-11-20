import React from 'react';
import {NavLink} from 'react-router-dom';
import {fetchArticleById, changeVote} from '../actions';
import {connect} from 'react-redux';
 
class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.voteClickHandler = this.voteClickHandler.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.article_id;
    this.props.fetchArticleById(id);
  }
  

  render () {
    return (
      <div className='main container-fluid'>
        <div className='article-item row'>
          <p className ='article-title'>{this.props.articles.title}</p>
          <p className ='article-author'>By {this.props.articles.created_by}</p>
          <p>{this.props.articles.body}</p>
        </div>
        <div className='article-comments row'>
          <div className='col-md-6 votes'>
            <a><img id={this.props.articles._id} onClick={this.voteClickHandler} value='up' className='article-heart-up' src='https://d30y9cdsu7xlg0.cloudfront.net/png/35608-200.png' alt='votes' /></a>
            <a><img id={this.props.articles._id} onClick={this.voteClickHandler} value='down' className='article-heart-down' src='https://d30y9cdsu7xlg0.cloudfront.net/png/35609-200.png' alt='votes' /></a>
            <p>{this.props.articles.votes}</p>
            
          </div>
          <div className='col-md-6 comments'>
            <p className='comment-p'><NavLink to={`/articles/${this.props.articles._id}/comments`}>{this.props.articles.comments} comments</NavLink></p>
          </div>
        </div>
      </div>
    );
  }
  voteClickHandler(e) {
    e.preventDefault();
    const mode = 'article';
    const id = e.target.id;
    const input = e.target.value;
    this.props.changeVote(input, id, mode);
  }
}

const mapStateToProps = state => ({
  articles: state.articles.data[0],
  loading: state.articles.loading,
  error: state.articles.error,
});

const mapDispatchToProps = dispatch => ({
  fetchArticleById: (id) => {
    dispatch(fetchArticleById(id));
  },
  changeVote: (input, id, mode) => {
    dispatch(changeVote(input, id, mode));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem);