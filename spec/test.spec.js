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
            const articleId = newData.comments[0].created_by;
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
                expect(res.body.msg).to.equal('Page not found');
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
    });
    describe('POST /comment', () => {
        it('sends back new comment object with status code of 200', () => {
            const articleId = newData.comments[0].belongs_to;
            return request
            .post(`/api/articles/${articleId}/comments`)
            .expect(200)
            .then((res) => {
                const comments = newData.comments;
                expect(res.body[0].body).to.equal('new comment');
                expect(res.body[0].created_by).to.equal('me');
                expect(res.body.length).to.equal(comments.length);
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
});
