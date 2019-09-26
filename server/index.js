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

app.use('/loaderio-bcced472ae364e041c5bf96bd422c8bc', (req,res) => res.send('loaderio-bcced472ae364e041c5bf96bd422c8bc'));
app.use('/api', router);

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
