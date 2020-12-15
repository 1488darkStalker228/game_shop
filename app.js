'use strict'
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const index = require('./routes');

app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(index);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server has been started...`);
});
