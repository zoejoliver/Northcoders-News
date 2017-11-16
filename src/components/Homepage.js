import React from 'react';
import {connect} from 'react-redux';
import fetchArticles from '../actions';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchArticles();
    }

    render () {
        return (
            <div>
                <h1>Northcoders News</h1>
                <h3>Most Popular Stories</h3>
                <div className='all-articles'>
                    <h1>Home</h1>
                    {this.props.articles.map((article) => {
                        const topic = article.belongs_to;
                        return (
                            <div key={article.title}>
                            <p>{article.title}</p>
                            <p>{topic}</p>
                            <p>{article.votes}</p>
                            <p>{article.comments}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    articles: state.articles.data,
    loading: state.articles.loading,
    error: state.articles.error
})

const mapDispatchToProps = dispatch => ({
    fetchArticles: () => {
        dispatch(fetchArticles())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);