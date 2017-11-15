const app = require('./server');
const {PORT} = require('./config')

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})