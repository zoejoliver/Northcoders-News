import React from 'react';
import {connect} from 'react-redux';
import {getMostPopular} from '../actions';
import {NavLink} from 'react-router-dom';

export class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
                return word[0].toUpperCase() + word.slice(1).toLowerCase();
              }).join(' ');
              
              let topicImg;
              if (topic === 'coding') topicImg = 'https://d30y9cdsu7xlg0.cloudfront.net/png/63341-200.png';
              else if (topic === 'cooking') topicImg = 'https://eastmanscorner.com/2016site/wp-content/uploads/2015/01/cooking-icon.png';
              else if (topic === 'football') topicImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Soccerball_mark.svg/535px-Soccerball_mark.svg.png';
              while (i < 12) {
                return (
                  <div key={article.title} className='col-xs-12 col-md-4 articles '>
                    <h4><NavLink to={`/articles/${article._id}`}>{title}<br/></NavLink></h4>
                    {(() => {
                      if (article.title.length < 38) {
                        return (
                          <br/>  
                        );
                      }
                    })()}
                    <div className='row article-details'>
                      <div className='col-md-4 topic-pic'>
                        <p><NavLink to={`/${topic}`}><img src={topicImg} alt='topic-img' /></NavLink></p>
                      </div>
                      <div className='col-md-4 comments'>
                        <p className='col-md-4'><NavLink to={`/articles/${article._id}/comments`}>{article.comments}<br/>comments</NavLink></p>
                      </div>
                      <div className='col-md-4 votes'>
                        <img className='heart' src='https://d30y9cdsu7xlg0.cloudfront.net/png/25848-200.png' alt='votes' />
                        <p className='col-md-4'>{article.votes}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);