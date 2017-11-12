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
                expect(res.body[0].title).to.equal(newData.topics[0].title);
                expect(res.body.length).to.equal(newData.topics.length);
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
                expect(res.body[0].title).to.equal(newData.articles[0].title);
                expect(res.body.length).to.equal(newData.articles.length);
                expect(res.status).to.equal(200);
            })
        });
    });
});
