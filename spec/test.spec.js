process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const mongoose = require('mongoose');
const {expect} = require('chai');
const app = require('../server');
const saveTestData = require('../seed/test.seed');
const { Articles, Comments, Topics, Users } = require('../models/models');
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
        })
    });

    describe('GET /topics', () => {
        it('sends back correct object with status code of 200', () => {
            return request
            .get('/api/topics')
            .expect(200)
            .then((res) => {
                expect(res.body.length).to.equal(3);
                res.body.forEach((topic) => {
                    expect(topic._id).to.be.a('string');
                    expect(topic.title).to.be.oneOf(['Football', 'Cats', 'Cooking']);
                })        
            })
        });
        it('sends back correct object and status code for valid id', () => {
            return request
            .get('/api/topics/football/articles')
            .expect(200)
            .then((res) => {
                expect(res.body.length).to.equal(1);
            })
        });
        it('sends back correct status code for invalid id', () => {
            return request
            .get('/api/topics/moomins/articles')
            .expect(404)
            .then((res) => {
                expect(res.body.msg).to.equal('Page not found');
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
                expect(res.body.length).to.equal(2);
                res.body.forEach(article => {
                    expect(article.belongs_to).to.be.oneOf(['football', 'cats']);
                    expect(article.title).to.be.oneOf(['Football is fun', 'Cats are great']);
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
                expect(res.body[0].body).to.be.oneOf(['this is a comment', 'this is another comment']);
            })
        });
        it('sends back correct status code for invalid id', () => {
            return request
            .get('/api/articles/zoe/comments')
            .expect(404)
            .then((res) => {
                expect(res.body.msg).to.equal('Invalid article Id');
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
                expect(res.body.msg).to.equal('Page not found');
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
            .expect(404)
        });
    });
    describe('DELETE /comments', () => {
        it('removes correct comment and status code', () => {
            const commentId = newData.comments[0]._id;
            return request
            .delete(`/api/comments/${commentId}`)
            .expect(200)
        });
        it('updates comments with correct one removed', () => {
            const numComments = newData.comments.length;
            return request
            expect(newData.comments.length).to.equal(numComments -1);
        });
        it('returns correct status code for invalid comment id', () => {
            return request
            .delete('/api/comments/123')
            .expect(404)
        });
    });
});
