'use strict'
const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server has been started...`);
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '14881347',
  database : 'games'
});

//Main;
app.get('/', (req, res) => {
  res.render('main');
});

//Все игры;
app.get('/games', (req, res) => {
  connection.query('SELECT * FROM games_table WHERE id <= 10', (err, result) => {
    if (err) throw err;
    res.render('games', {
      games: JSON.parse(JSON.stringify(result))
    });
  });
});

//Жанры;
app.get('/genres', (req, res) => {
  //Нужна проверка существования переменной, если нет такой, то на страницу 404;
  const genresId = req.query.id;

  const genres = new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM genres WHERE id = ${genresId}`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  const games = new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM games_table WHERE genre = ${genresId}`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  Promise.all([genres, games])
    .then(value => {
      res.render('genres', {
        genres: JSON.parse(JSON.stringify(value[0])),
        games: JSON.parse(JSON.stringify(value[1]))
      });
    });
});

//Обработчик fetch-запроса для файла genres.js
app.post('/get-genres-list', (req, res) => {
  connection.query('SELECT id, title FROM genres', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});