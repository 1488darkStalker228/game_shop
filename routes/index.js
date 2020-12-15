const {Router} = require('express');
const router = Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '14881347',
  database : 'games'
});

connection.connect(err => {
  if (err) {
    return console.error('Ошибка: '+ err.message)
  }
});

//Главная;
router.get('/', (req, res) => {
  res.render('main', {
    title: 'Game Shop - Главная'
  });
});

//Страница отдельной игры;
router.get('/game/*', (req, res) => {
  connection.query(
    `SELECT
      games_table.id,
      games_table.title as game_title,
      games_table.price,
      games_table.img,
      genres.title as genre_title
    FROM 
      games_table
    LEFT JOIN
      genres
    ON games_table.genre = genres.id
    WHERE games_table.title = '${req.params['0']}'`, (err, result) => {
      if (err) throw err;
      res.render('game', {
        game: JSON.parse(JSON.stringify(result)),
        title: `Купить ${result[0]['game_title']}`
      });
    }
  );
});

// Страница всех игр;
router.get('/games/:page', (req, res) => {
  const inc = +req.params.page + 1;
  const dec = +req.params.page - 1;
  const currPage = +req.params.page;

  let amountToShow = 5;

  if (currPage < 6) {
    amountToShow = currPage - 1;
  }

  const games = new Promise((resolve, reject) => {
    connection.query(
      `SELECT
        games_table.id,
        games_table.title as game_title,
        games_table.price,
        games_table.img,
        genres.title as genre_title
      FROM 
        games_table
      LEFT JOIN
        genres
      ON games_table.genre = genres.id
      LIMIT 10
      OFFSET ${req.params.page * 10 - 10}`, (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });

  const gamesLength = new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM games_table`, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });

  Promise.all([games, gamesLength])
  .then(value => {

    let limit = Math.ceil(value[1].length / 10);

    if (currPage < limit - 4) {
      limit = 4;
    } else {
      limit = limit - currPage;
    }

    res.render('games', {
      games: JSON.parse(JSON.stringify(value[0])),
      genre: 'games',
      title: 'Каталог продукции',
      length: Math.ceil(value[1].length / 10),
      limit,
      inc,
      dec,
      currPage,
      amountToShow
    });
  });
});

//Страница жанров;
router.get('/:genre/:page', (req, res) => {
  const inc = +req.params.page + 1;
  const dec = +req.params.page - 1;
  const currPage = +req.params.page;

  let amountToShow = 5;

  if (currPage < 6) {
    amountToShow = currPage - 1;
  }

  const games = new Promise((resolve, reject) => {
    connection.query(
      `SELECT
        games_table.id,
        games_table.title as game_title,
        games_table.price,
        games_table.img,
        genres.title as genre_title,
        genres.title_en as genre_title_en
      FROM 
	      games_table
      LEFT JOIN
	      genres
      ON games_table.genre = genres.id
      WHERE
	      title_en = '${req.params.genre}'
	    LIMIT 10
      OFFSET ${req.params.page * 10 - 10}`, (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });

  //Для получения длины;
  const gamesLength = new Promise((resolve, reject) => {
    connection.query(
      `SELECT
        * 
      FROM
        games_table 
      LEFT JOIN
	      genres
      ON games_table.genre = genres.id
      WHERE title_en = '${req.params.genre}'`, (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });

  Promise.all([games, gamesLength])
  .then(value => {

    let limit = Math.ceil(value[1].length / 10);

    if (currPage < limit - 4) {
      limit = 4;
    } else {
      limit = limit - currPage;
    }

    res.render('genres', {
      games: JSON.parse(JSON.stringify(value[0])),
      genre: value[0][0]['genre_title_en'],
      title: value[0][0]['genre_title'],
      length: Math.ceil(value[1].length / 10),
      limit,
      inc,
      dec,
      currPage,
      amountToShow
    });
  });
});

//Inner корзина;
router.get('/order', (req, res) => {
  res.render('order', {
    title: 'Game Shop - Корзина'
  });
});

//Обработчик fetch-запроса для файла popup-genres.js;
router.post('/get-genres-list', (req, res) => {
  connection.query('SELECT id, title, title_en FROM genres', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

//Обработчик fetch-запроса для файла cart-handler.js;
router.post('/get-game-info', (req, res) => {
  if (req.body.key.length !== 0) {
    connection.query(`SELECT id, title, price, img FROM games_table WHERE id IN (${req.body.key.join(',')})`, (err, result) => {
      if (err) throw err;
      const games = {};
      for (let i = 0; i < result.length; i++) {
        games[result[i]['id']] = result[i];
      }
      res.json(games);
    });
  } else {
    res.send('0');
  }
});

//Импортированный модуль с функцией;
const sendOrder = require('../sendOrder');
//Обработчик формы заказа(order.js);
router.post('/order-registration', (req, res) => {
  connection.query(`SELECT id, title, price FROM games_table WHERE id IN (${Object.keys(req.body.key).join(',')})`, (err, result) => {
    if (err) throw err;
    sendOrder(req.body, result);
    res.send(true);
  });
});

module.exports = router;

