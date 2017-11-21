import React from 'react';
import {fetchArticleById, changeVote} from '../actions';
import {connect} from 'react-redux';
import Comments from './Comments';
import PT from 'prop-types';

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentFlag: false
    };
    this.voteClickHandler = this.voteClickHandler.bind(this);
    this.showComments = this.showComments.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.article_id;
    this.props.fetchArticleById(id);
  }

  render () {
    const title = this.props.articles.title.split(' ').map((word) => {
      if (word.toLowerCase().match(/[aeiou]/)) { 
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      }
      else return word.toUpperCase();
    }).join(' ');
    return (
      <div className='main container-fluid'>
        <div className='article-item'>
          <div className='art-title row'>
            <p className ='col-xs-12 col-md-10 article-title'>{title}</p>
            <div className='col-xs-12 col-md-2 votes-article-item'>
              <input type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35608-200.png" name="up" onClick={this.voteClickHandler} className="vote-btn" id={this.props.articles._id} />
              <input type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35609-200.png" name="down" onClick={this.voteClickHandler} className="vote-btn" id={this.props.articles._id} />
              <p className='vote-num'>{this.props.articles.votes} votes</p>
            </div>
          </div>
          <p className ='article-author'>By {this.props.articles.created_by}</p>
          <p>{this.props.articles.body}</p>
          <button className='comment-p' onClick={this.showComments}>{this.props.articles.comments} comments</button>      
        </div>
        
        {(() => {
          if (this.state.commentFlag) {
            return (
              <div className='comment-component'>
                <Comments article_id={this.props.match.params.article_id}/>
              </div>
            );
          }
        })()}
        
      </div>
    );
  }
  voteClickHandler(e) {
    e.preventDefault();
    const mode = 'article';
    const id = e.target.id;
    const input = e.target.name;
    this.props.changeVote(input, id, mode);
  }

  showComments() {
    this.setState({
      commentFlag: true
    });
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

ArticleItem.propTypes = {
  articles: PT.object.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchArticleById: PT.func.isRequired,
  changeVote: PT.func.isRequired,
  match: PT.any.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem);