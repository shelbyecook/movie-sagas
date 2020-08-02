const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET ALL MOVIES
router.get('/', (req, res) => {
  const queryString = `SELECT * FROM "movies" ORDER BY "title" ASC;`;

  pool
    .query(queryString)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// GET DETAILS FOR SINGLE MOVIE
router.get('/details/:id', (req, res) => {
  const queryString = `SELECT * FROM "movies" WHERE "id" = $1;`;
  const movieId = req.params.id;

  pool
    .query(queryString, [movieId])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

// CREATE PUT FOR UPDATING A SINGLE MOVIE
router.put('/edit/:id', (req, res) => {
  const queryText = `UPDATE "movies"
    SET "title" = $1, "description" = $2
    WHERE "id" = $3;`;
  const movieId = req.params.id;
  const newMovieData = req.body;

  pool
    .query(queryText, [newMovieData.title, newMovieData.description, movieId])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});
module.exports = router;
