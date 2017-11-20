import React from 'react';
import {connect} from 'react-redux';
import {fetchArticlesByTopic, changeVote} from '../actions';
import {NavLink} from 'react-router-dom';

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.voteClickHandler = this.voteClickHandler.bind(this);
  }

  componentDidMount() {
    const topic = this.props.match.params.topic;
    this.props.fetchArticlesByTopic(topic);
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.match.params.topic !== this.props.match.params.topic) {
      this.props.fetchArticlesByTopic(nextProps.match.params.topic);
    }
  }

  render () {
    const topicTitle = this.props.match.params.topic[0].toUpperCase() + this.props.match.params.topic.slice(1);
    return (
      <div className='main container-fluid'>
        <div className='topic-articles'>
          <h2>{topicTitle}</h2>
          <div className='row'>
            {this.props.articles.map((article) => {
              const topic = article.belongs_to;
              const title = article.title.split(' ').map((word) => {
                return word[0].toUpperCase() + word.slice(1).toLowerCase();
              }).join(' ');
              let topicImg;
              if (topic === 'coding') topicImg = 'https://d30y9cdsu7xlg0.cloudfront.net/png/63341-200.png';
              else if (topic === 'cooking') topicImg = 'https://eastmanscorner.com/2016site/wp-content/uploads/2015/01/cooking-icon.png';
              else if (topic === 'football') topicImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Soccerball_mark.svg/535px-Soccerball_mark.svg.png';
         
              return (
                <div key={article.title} className='col-xs-12 col-md-4 articles'>
                  <h4><NavLink to={`/articles/${article._id}`}>{title}</NavLink></h4>
                  {(() => {
                    if (article.title.length < 38) {
                      return (
                        <br/>  
                      );
                    }
                  })()}
                  <div className='row article-details'>
                    <div className='col-md-4 topic-pic'>
                      <img src={topicImg} alt='topic-img' />
                    </div>
                    <div className='col-md-4 comments'>
                      <p className='col-md-4'><NavLink to={`/articles/${article._id}/comments`}>{article.comments} comments</NavLink></p>
                    </div>
                    <div className='col-md-4 votes'>
                      <img className='heart' src='https://d30y9cdsu7xlg0.cloudfront.net/png/25848-200.png' alt='votes' />
                      <p className='col-md-4'>{article.votes}</p>
                      <a id={article._id} onClick={this.voteClickHandler} value='up'> + </a>
                      <a id={article._id} onClick={this.voteClickHandler} value='down'> - </a>
                    </div> 
                  </div>
                  
                  
                    
                   
                </div>
              );
            })}
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
  articles: state.articles.data,
  loading: state.articles.loading,
  error: state.articles.error
});

const mapDispatchToProps = dispatch => ({
  fetchArticlesByTopic: (topic) => {
    dispatch(fetchArticlesByTopic(topic));
  },
  changeVote: (input, id, mode) => {
    dispatch(changeVote(input, id, mode));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
