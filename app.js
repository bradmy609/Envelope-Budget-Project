// Envelope Budget Codeacademy Independent Portfolio Project
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');

const app = express();

module.exports = app;

const PORT = process.env.port || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(errorhandler());

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(PORT, () => {
    console.log(`Server is now listening at PORT ${PORT}`)
})
