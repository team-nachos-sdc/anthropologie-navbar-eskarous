const express = require('express');
const app = express();
const port = 4000;
const router = require('./router.js');

const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router);

app.listen(port, () => console.log(`App listening on port ${port}!`))
