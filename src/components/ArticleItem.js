import React from 'react';
import {fetchArticleById, changeVote} from '../actions/articles';
import {connect} from 'react-redux';
import Comments from './Comments';
import PT from 'prop-types';
import Loading from './Loading';

class ArticleItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      commentFlag: false,
      votes: 0
    };
    this.voteClickHandler = this.voteClickHandler.bind(this);
    this.showComments = this.showComments.bind(this);
    this.hideComments = this.hideComments.bind(this);
  }
  componentDidMount () {
    const id = this.props.match.params.article_id;
    this.props.fetchArticleById(id);
  }

  render () {
 
    if (this.props.articles.length > 0) {
      const title = this.props.articles[0].title.split(' ').map((word) => {
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
                <input type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35608-200.png" name="up" onClick={this.voteClickHandler} className="vote-btn" id={this.props.articles[0]._id} />
                <input type="image" src="https://d30y9cdsu7xlg0.cloudfront.net/png/35609-200.png" name="down" onClick={this.voteClickHandler} className="vote-btn" id={this.props.articles[0]._id} />
                {(() => {
                  if (this.props.loading) {
                    return (
                      <p className='vote-num'>{this.state.votes} votes</p>
                    );
                  }
                  else {
                    return (
                      <p className='vote-num'>{this.props.articles[0].votes} votes</p>
                    );
                  } 
                })()}
              </div>
            </div>
            <p className ='article-author'>By {this.props.articles[0].created_by}</p>
            <p>{this.props.articles[0].body}</p>
            {(() => {
            if (this.state.commentFlag || this.props.commentflag === 'true') {
              return (
                <button className='comment-p' onClick={this.hideComments}>hide comments</button>   
              );
            }
            else return (
                <button className='comment-p' onClick={this.showComments}>show comments</button>   
            );
          })()}   
          </div>
        
          {(() => {
            if (this.state.commentFlag || this.props.commentflag === 'true') {
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
    else {
      return (
        <Loading />
      );
    }
    
  }
  
  voteClickHandler (e) {
    e.preventDefault();
    const mode = 'article';
    const id = e.target.id;
    const input = e.target.name;
    const prevVotes = this.props.articles[0].votes;
    let newVotes;
    if (input === 'up') newVotes = prevVotes + 1;
    else  newVotes = prevVotes - 1;
    this.setState({
      votes: newVotes
    })
    this.props.changeVote(input, id, mode);
  }

  showComments () {
    this.setState({
      commentFlag: true
    });
  }
  hideComments () {
    this.setState({
      commentFlag: false
    });
  }
}

const mapStateToProps = (state) => ({
  articles: state.articles.data,
  loading: state.articles.loading,
  error: state.articles.error
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
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  fetchArticleById: PT.func.isRequired,
  changeVote: PT.func.isRequired,
  match: PT.any.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem);