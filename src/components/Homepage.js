import React from 'react';
import {connect} from 'react-redux';
import {getMostPopular} from '../actions/articles';
import {NavLink} from 'react-router-dom';
import PT from 'prop-types';

export class Homepage extends React.Component {
  constructor (props) {
    super(props);
  }
  componentDidMount () {
    this.props.getMostPopular();
  }
  render () {
    return (
      <div className='main container-fluid'>
        <div className='pop-articles'>
          <h2>Most Popular Stories</h2>
          <div className='row'>
            {this.props.articles.map((article, i) => {
              const topic = article.belongs_to;
              const title = article.title.split(' ').map((word) => {
                if (word.toLowerCase().match(/[aeiou]/)) { 
                  return word[0].toUpperCase() + word.slice(1).toLowerCase();
                }
                else return word.toUpperCase();
              }).join(' ');
              
              let topicImg;
              if (topic === 'coding') topicImg = 'https://d30y9cdsu7xlg0.cloudfront.net/png/63341-200.png';
              else if (topic === 'cooking') topicImg = 'https://eastmanscorner.com/2016site/wp-content/uploads/2015/01/cooking-icon.png';
              else if (topic === 'football') topicImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Soccerball_mark.svg/535px-Soccerball_mark.svg.png';
              while (i < 12) {
                return (
                  <div key={article.title} className='col-xs-12 col-md-4 articles '>
                    <div className='row article-title-box'>
                      <h4><NavLink to={`/articles/${article._id}`}>{title}<br/></NavLink></h4>
                    </div>
                    <div className='row article-details'>
                      <div className='col-md-4 topic-pic'>
                        <p><NavLink to={`/${topic}`}><img src={topicImg} alt='topic-img' /></NavLink></p>
                      </div>
                      <div className='col-md-4 comments'>
                        <p><NavLink className='comment-link' commentflag='true' to={`/articles/${article._id}`}>{article.comments}<br/>comments</NavLink></p> 
                      </div>
                      <div className='col-md-4 votes'>
                        <img className='heart' src='https://d30y9cdsu7xlg0.cloudfront.net/png/25848-200.png' alt='votes' />
                        <p>{article.votes}</p>
                      </div> 
                    </div>
                  </div>
                );
              }
            }
          
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles.data,
  loading: state.articles.loading,
  error: state.articles.error
});

const mapDispatchToProps = dispatch => ({
  getMostPopular: () => {
    dispatch(getMostPopular());
  }
});

Homepage.propTypes = {
  articles: PT.array.isRequired,
  loading: PT.bool.isRequired,
  error: PT.any,
  getMostPopular: PT.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);