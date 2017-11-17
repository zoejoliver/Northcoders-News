import React from 'react';
import {NavLink} from 'react-router-dom';
import {fetchArticleById} from '../actions';
import {connect} from 'react-redux';
 
class ArticleItem extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.article_id;
    this.props.fetchArticleById(id);
  }

  render () {
    return (
      <div>
        <div className='article-item'>
          <p>{this.props.articles.title}</p>
          <p>{this.props.articles.belongs_to}</p>
          <p>{this.props.articles.body}</p>
          <p>{this.props.articles.votes}</p>
          <p><NavLink to={`/articles/${this.props.articles._id}/comments`}>{this.props.articles.comments} Comments</NavLink></p>
        </div>
      </div>
    );
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem);