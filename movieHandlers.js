const database = require("./database");

const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.status(200).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(`select * from movies where id = ${id}`)
    .then(([movie]) => {
      movie[0]
        ? res.status(200).json(movie[0])
        : res.status(404).send("not found");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd pour récup un film");
    });
};

const createMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème d'insertion dans la bdd");
    });
};

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;
  database
    .query(
      `update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ${id}`,
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      result.affectedRows === 0
        ? res.status(404).send("le film à mettre à jour est introuvable")
        : res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd pour récup un film");
    });
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
};
