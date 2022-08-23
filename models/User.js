const database = require("../database");

const getUsers = ({ firstname, lastname, email, city, language }) => {
  let sqlValues = [];
  let sql = "select * from users";

  if (firstname) {
    sqlValues.length ? (sql += " and ") : (sql += " where ");
    sql += "firstname like ?";
    sqlValues.push(`%${firstname}%`);
  }
  if (lastname) {
    sqlValues.length ? (sql += " and ") : (sql += " where ");
    sql += "lastname like ?";
    sqlValues.push(`%${lastname}%`);
  }
  if (email) {
    sqlValues.length ? (sql += " and ") : (sql += " where ");
    sql += "email like ?";
    sqlValues.push(`%${email}%`);
  }
  if (city) {
    sqlValues.length ? (sql += " and ") : (sql += " where ");
    sql += "city like ?";
    sqlValues.push(`%${city}%`);
  }
  if (language) {
    sqlValues.length ? (sql += " and ") : (sql += " where ");
    sql += "language like ?";
    sqlValues.push(`%${language}%`);
  }

  return database.query(sql, sqlValues).then(([result]) => result);
};

const getUserById = (id) => {
  return database
    .query("select * from users where id = ?", [id])
    .then(([result]) => result);
};

const createUser = ({ firstname, lastname, email, city, language }) => {
  return database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      const id = result.insertId;
      return { id, firstname, lastname, email, city, language };
    });
};

const updateUser = ({ id, firstname, lastname, email, city, language }) => {
  return database
    .query(
      `update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ${id}`,
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      return result.affectedRows;
    });
};

const deleteUser = (id) => {
  return database
    .query(`delete from users where id = ?`, [id])
    .then(([result]) => {
      return result.affectedRows;
    })
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
