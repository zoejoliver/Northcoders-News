process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const mongoose = require('mongoose');
const {expect} = require('chai');
const app = require('../server');
const saveTestData = require('../seed/test.seed');
const request = supertest(app);
mongoose.Promise = global.Promise;

describe('API', () => {
let newData;
    beforeEach(() => {
    return mongoose.connection.db.dropDatabase()
    .then(saveTestData)
    .then((data) => {
        newData = data;
    })
    .catch((err) => {
        console.log(err);
    });
  });

  describe('GET /topics', () => {
    it('sends back correct object with status code of 200', () => {
        return request
        .get('/api/topics')
        .expect(200)
        .then((res) => {
        expect(res.body.length).to.equal(newData.topics.length);
        res.body.forEach((topic) => {
            expect(topic._id).to.be.a('string');
            expect(topic.title).to.be.oneOf([newData.topics[0].title, newData.topics[1].title, newData.topics[2].title]);
        })        
        });
    });
    it('sends back correct object and status code for valid id', () => {
        return request
        .get('/api/topics/football/articles')
        .expect(200)
        .then((res) => {
        expect(res.body.length).to.equal(1);
        })
    });
    it('sends back correct status code for invalid topic', () => {
        return request
        .get('/api/topics/moomins/articles')
        .expect(404)
        .then((res) => {
        expect(res.body.message).to.equal('Page not found');
        })
    });
    it('sends back topic articles with comment count', () => {
        return request
        .get('/api/topics/cats/articles')
        .expect(200)
        .then((res) => {
        expect(res.body[0].comments).to.be.a('number');
        })
    });
  });

  describe('GET /articles', () => {
    it('sends back correct object with status code of 200', () => {
        return request
        .get('/api/articles')
        .expect(200)
        .then((res) => {
        expect(res.body.length).to.equal(newData.articles.length);
        res.body.forEach(article => {
            expect(article.belongs_to).to.be.oneOf([newData.articles[0].belongs_to, newData.articles[1].belongs_to]);
            expect(article.title).to.be.oneOf([newData.articles[0].title, newData.articles[1].title]);
        })
        })
    });
    it('sends back correct object and status code for valid id', () => {
        const articleId = newData.comments[0].belongs_to;
        return request
        .get(`/api/articles/${articleId}/comments`)
        .expect(200)
        .then((res) => {
        expect(res.body.length).to.equal(2);
        res.body.forEach(comment => {
            expect(comment.body).to.be.oneOf([newData.comments[0].body, newData.comments[1].body]);
        })
        })
    });
    it('sends back correct status code for invalid article id', () => {
        return request
        .get('/api/articles/zoe/comments')
        .expect(400)
        .then((res) => {
        expect(res.body.message).to.equal('Invalid article ID');
        })
    });
    it('sends back articles with comment count', () => {
        return request
        .get('/api/articles')
        .expect(200)
        .then((res) => {
        expect(res.body[0].comments).to.be.a('number');
        })
    });
    it('returns correct article and status code for valid article id', () => {
        const articleId = newData.articles[0]._id;
        return request
        .get(`/api/articles/${articleId}`)
        .expect(200)
        .then((res) => {
        expect(res.body.length).to.equal(1);
        expect(res.body[0]._id).to.equal(articleId.toString());
        })
    })
  });
  describe('POST /comment', () => {
    it('sends back new comment object with status code of 200', () => {
        const articleId = newData.comments[0].belongs_to;
        return request
        .post(`/api/articles/${articleId}/comments`)
        .expect(200)
        .then((res) => {
        const comments = newData.comments;
        expect(res.body[0].created_by).to.equal('northcoder');
        expect(res.body.length).to.equal(comments.length + 1);
        })
    });
  });
  describe('GET /users', () => {
    it('sends back correct user data object with code of 200', () => {
        const username = newData.user.username;
        return request
        .get(`/api/users/${username}`)
        .expect(200)
        .then((res) => {
        expect(res.body[0].username).to.equal(username);
        })
    });
    it('sends back correct status code for invalid username', () => {
        return request
        .get('/api/users/zoe')
        .expect(404)
        .then((res) => {
        expect(res.body.message).to.equal('Page not found');
        })
    });
  });
  describe('PUT /articles', () => {
    it('updates article votes with either up vote', () => {
        const articleId = newData.articles[0]._id;
        const prevVotes = newData.articles[0].votes;
        return request
        .put(`/api/articles/${articleId}?vote=up`)
        .expect(200)
        .then((res) => {
        expect(res.body.votes).to.equal(prevVotes + 1);
        })
    });
    it('updates article votes with down vote', () => {
        const articleId = newData.articles[0]._id;
        const prevVotes = newData.articles[0].votes;
        return request
        .put(`/api/articles/${articleId}?vote=down`)
        .expect(200)
        .then((res) => {
        expect(res.body.votes).to.equal(prevVotes - 1);
        })
    });
  });
  describe('PUT /comments', () => {
    it('updates comment votes with either up vote', () => {
        const commentId = newData.comments[0]._id;
        const prevVotes = newData.comments[0].votes;
        return request
        .put(`/api/comments/${commentId}?vote=up`)
        .expect(200)
        .then((res) => {
        expect(res.body.votes).to.equal(prevVotes + 1);
        })
    });
    it('updates comment votes with down vote', () => {
        const commentId = newData.comments[1]._id;
        const prevVotes = newData.comments[1].votes;
        return request
        .put(`/api/comments/${commentId}?vote=down`)
        .expect(200)
        .then((res) => {
        expect(res.body.votes).to.equal(prevVotes - 1);
        })
    });
    it('returns correct status code for invalid comment id', () => {
        return request
        .put('/api/comments/123?vote=down')
        .expect(400)
    });
  });
  describe('DELETE /comments', () => {
    it('removes correct comment and status code', () => {
        const commentId = newData.comments[0]._id;
        const numComments = newData.comments.length;
        return request
        .delete(`/api/comments/${commentId}`)
        .query({ article_id: `${newData.comments[0].belongs_to}` })
        .expect(200)
        .then((res) => {
          expect(res.body.length).to.equal(numComments-1);
          })  
    });    
    it('returns correct status code for invalid comment id', () => {
        return request
        .delete('/api/comments/123')
        .expect(400)
    });
  });
});
