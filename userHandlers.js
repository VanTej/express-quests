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

module.exports = {
  getUsers,
  getUserById,
};
