const moviesRouter = require("express").Router();
const Movie = require("../models/Movie");
const { decodeToken } = require("../helpers/users");

moviesRouter.get("/", (req, res) => {
  const { title, director, year, color, max_duration, user } = req.query;
  Movie.getMovies({
    filters: { title, director, year, color, max_duration, user },
  })
    .then((movies) => {
      if (movies) {
        res.json(movies);
      } else {
        res.status(404).send("Movies not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd");
    });
});

moviesRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Movie.getMovieById(id)
    .then((movie) => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).send("Movie not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd");
    });
});

moviesRouter.post("/", (req, res) => {
  const { title, director, year, color, duration } = req.body;
  const { user_token } = req.cookies;
  const user_id = decodeToken(user_token).id;
  Movie.createMovie({
    filters: { title, director, year, color, duration, user_id },
  })
    .then((movie) => res.status(201).json(movie))
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème d'insertion dans la bdd");
    });
});

moviesRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  Movie.updateMovie({ id, title, director, year, color, duration })
    .then((modified) => (modified ? res.sendStatus(200) : res.sendStatus(404)))
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème d'accès à la bdd");
    });
});

moviesRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Movie.deleteMovie(id)
    .then((deleted) => (deleted ? res.sendStatus(200) : res.sendStatus(404)))
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd pour récup un film");
    });
});

module.exports = moviesRouter;
