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

// GET ALL GENRES

// GET MOVIES WITH GENRES

module.exports = router;
