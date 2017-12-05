const {PORT} = process.env;

// if (!PORT) throw new Error('Port number not provided');
// if (!DB) throw new Error('DB connection not provided');

module.exports = {
    PORT,
    DB: 'mongodb://northcoders-news:northcoders-news@ds163595.mlab.com:63595/northcoders-news-api'    
};