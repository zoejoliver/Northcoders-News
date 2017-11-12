process.env.NODE_ENV = 'test';
const supertest = require('supertest');
const mongoose = require('mongoose');
const {expect} = require('chai');
const app = require('../server');
const saveTestData = require('../seed/test.seed');
const { Articles, Comments, Topics, Users } = require('../models/models');
const request = supertest(app);
mongoose.Promise = Promise;

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
            .then((res) => {
                const topics = newData.topics;
                expect(res.body[0].title).to.equal(topics[0].title);
                expect(res.body.length).to.equal(topics.length);
                expect(res.status).to.equal(200);
            })
        });
        it('sends back correct object and status code for valid id', () => {
            return request
            .get('/api/topics/football/articles')
            .expect(200)
            .then((res) => {
                expect(res.body[0].title).to.equal('Football is fun');
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
            .then((res) => {
                const articles = newData.articles;
                expect(res.body[0].title).to.equal(articles[0].title);
                expect(res.body.length).to.equal(articles.length);
                expect(res.status).to.equal(200);
            })
        });
        it('sends back correct object and status code for valid id', () => {
            const articleId = newData.comments[0].belongs_to;
            return request
            .get(`/api/articles/${articleId}/comments`)
            .expect(200)
            .then((res) => {
                const comments = newData.comments;
                expect(res.body[0].body).to.equal(comments[0].body);
                expect(res.body.length).to.equal(comments.length);
            })
        });
        
    });
});
