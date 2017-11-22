# Northcoders News

Northcoders News is an end-to-end project hosted [here](). The project is designed to have the functionality of reddit using a dataset seeded to a MongoDB and hosted on mLabs. 

It uses Node.js and Express to provide custom API routes to a React front-end. The back-end server is hosted on Heroku [here](https://northcoders-news-zjo.herokuapp.com/api/articles).



## Getting Started
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

To run the project on local host (port 9090), run the following:
```
npm run dev
```

This project comes with extensive testing. If you would like to run the tests, you can do so with node:
```
npm test
```

This runs the tests for the front-end. To run the back-end API tests, you will need to install mongo.

Next you will need to make sure you have a local mongo database running in another terminal, by typing the following into the command line:

```
mongod
```

Finally, once your Mongo database is up and running running, in order to run the API tests you will need to open the code, navigate into the spec folder, and find the test.spec.js. Now remove the 'x' from line 11 of the code - this will change these tests from pending to active.

### Prerequisites

To run this project you will need node.js installed locally.

### Installing

Please follow this guide to get the site up and running, from the command line enter the following -

#### To run the site locally:

```
npm run dev
```

To view the site open browser to

http://localhost:9000

## Running the tests

## Built With
[React JS]()

[Redux]()

[Axios]()

## Authors

[Zoe Oliver](https://github.com/zoejoliver)


