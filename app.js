require("dotenv").config();
const express = require("express");
const { setupRoutes } = require('./routes');

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5001;

setupRoutes(app);

// const movieHandlers = require("./models/Movie");
// const { validateMovie } = require("./validators")

// app.get("/api/movies", movieHandlers.getMovies);
// app.get("/api/movies/:id", movieHandlers.getMovieById);
// app.post("/api/movies", validateMovie, movieHandlers.createMovie);
// app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
// app.delete("/api/movies/:id", movieHandlers.deleteMovie);

// const userHandlers = require("./models/User");
// const { validateUser} = require("./validators")

// app.get("/api/users", userHandlers.getUsers);
// app.get("/api/users/:id", userHandlers.getUserById);
// app.post("/api/users", validateUser, userHandlers.createUser);
// app.put("/api/users/:id", validateUser, userHandlers.updateUser);
// app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
