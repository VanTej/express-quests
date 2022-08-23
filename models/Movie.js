const database = require("../database");

const getMovies = ({
  filters: { title, director, year, color, max_duration },
}) => {
  let sqlValues = [];
  let sql = "select * from movies";

  if (title) {
    sqlValues.length ? (sql += " and ") : (sql += " where ");
    sql += "title like ?";
    sqlValues.push(`%${title}%`);
  }
  if (director) {
    sqlValues.length ? (sql += " and ") : (sql += " where ");
    sql += "director like ?";
    sqlValues.push(`%${director}%`);
  }
  if (year) {
    sqlValues.length ? (sql += " and ") : (sql += " where ");
    sql += "year = ?";
    sqlValues.push(year);
  }
  if (color) {
    sqlValues.length ? (sql += " and ") : (sql += " where ");
    sql += "color = ?";
    sqlValues.push(color);
  }
  if (max_duration) {
    sqlValues.length ? (sql += " and ") : (sql += " where ");
    sql += "duration <= ?";
    sqlValues.push(max_duration);
  }
  return database.query(sql, sqlValues).then(([result]) => result);
};

const getMovieById = (id) => {
  return database
    .query(`select * from movies where id = ${id}`)
    .then(([result]) => result);
};

const createMovie = ({
  filters: { title, director, year, color, duration },
}) => {
  return database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      const id = result.insertId;
      return { id, title, director, year, color, duration };
    });
};

const updateMovie = ({ id, title, director, year, color, duration }) => {
  return database
    .query(
      `update movies set title = ?, director = ?, year = ?, color = ?, duration = ? where id = ${id}`,
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      return result.affectedRows;
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd pour récup un film");
    });
};

const deleteMovie = (id) => {
  return database
    .query(`delete from movies where id = ${id}`)
    .then(([result]) => {
      return result.affectedRows;
    });
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
