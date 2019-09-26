require('newrelic');
const express = require('express');
const router = require('./router.js');

const bodyParser = require('body-parser');
const path = require('path');
// const morgan = require('morgan');

const app = express();
const port = 3002;

// app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/loaderio-8b9d48661471f1e63383fc74b5f4d7a2', (req,res) => res.send('loaderio-8b9d48661471f1e63383fc74b5f4d7a2'));
app.use('/api', router);

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
