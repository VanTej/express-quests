const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(`select * from users where id = ${id}`)
    .then(([user]) => {
      user[0]
        ? res.status(200).json(user[0])
        : res.status(404).send("not found");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd pour récup un utilisateur");
    });
};

const createUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème d'insertion d'utilisateur dans la bdd");
    });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      `update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ${id}`,
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      result.affectedRows === 0
        ? res.status(404).send("l'utilisateur à mettre à jour est introuvable")
        : res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd pour récup un utilisateur");
    });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query(`delete from users where id = ?`, [id])
    .then(([result]) => {
      result.affectedRows === 0
        ? res.status(404).send("l'utilisateur à supprimer est introuvable")
        : res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd pour récup un utilisateur");
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
