# Northcoders News

Northcoders News is an end-to-end project. The project is designed to have the functionality of reddit using a dataset seeded to a MongoDB and hosted on mLabs. 

It uses Node.js and Express to provide custom API routes to a React front-end hosted [here](https://zjo-northcoders-news.herokuapp.com/). The back-end server is hosted on Heroku [here](https://northcoders-news-zjo.herokuapp.com/api/articles).

### Prerequisites

To run this project you will need node.js installed locally.

### Installing

#### To run the site locally:

Clone the project, navigate into the directory and then install the necessary dependencies:

```
git clone https://github.com/zoejoliver/Northcoders-News
```

```
cd Northcoders-News
```

```
npm install
```
To run the project on local host open browser to http://localhost:9000 and run the following:

```
npm run dev
```
## Running the tests

If you would like to run the tests, you can do so by typing:
```
npm test
```

This runs the tests for the front-end. To run the back-end API tests, you will need to install mongo.

Next you will need to make sure you have a local mongo database running in another terminal, by typing the following into the command line:

```
mongod
```

Finally, once your Mongo database is up and running, in order to run the API tests you will need to open the code, navigate into the spec folder, and find the test.spec.js. Now remove the 'x' from line 11 of the code - this will change these tests from pending to active.

```
npm test
```

## Built With
[React JS](https://reactjs.org/)

[Redux](https://redux.js.org/)

[Axios](https://www.npmjs.com/package/axios)

[MongoDB](https://www.mongodb.com/cloud/atlas/lp/general?jmp=search&utm_source=google&utm_campaign=EMEA-UK-IE-MongoDB-to-Atlas-Brand-Alpha&utm_keyword=mongodb&utm_device=c&utm_network=g&utm_medium=cpc&utm_creative=229921765157&utm_matchtype=e&_bt=229921765157&_bk=mongodb&_bm=e&_bn=g&gclid=Cj0KCQiAmITRBRCSARIsAEOZmr5nWbSmk1kiF8n10In8ATXubYeQuKnq-R5963PuhNbEyl-Pg1774W0aArGHEALw_wcB)

[Mongoose](http://mongoosejs.com/)


## Authors

[Zoe Oliver](https://github.com/zoejoliver)


