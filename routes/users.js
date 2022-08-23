const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.get("/", (req, res) => {
  const { firstname, lastname, email, city, language } = req.query;
  User.getUsers({ filters: { firstname, lastname, email, city, language } })
    .then((users) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd");
    });
});

usersRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  User.getUserById(id)
    .then((user) => {
        console.log(user);
      user
        ? res.json(user).status(200)
        : res.status(404).send("User not found");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd");
    });
});

usersRouter.post("/", (req, res) => {
  User.createUser(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème d'insertion dans la bdd");
    });
});

usersRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id); 
  const { firstname, lastname, email, city, language } = req.body;

  User.updateUser({ id, firstname, lastname, email, city, language })
    .then((modified) => (modified ? res.sendStatus(200) : res.sendStatus(404)))
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème d'accès à la bdd");
    });
});

usersRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  User.deleteUser(id)
    .then((deleted) => (deleted ? res.sendStatus(200) : res.sendStatus(404)))
    .catch((err) => {
      console.error(err);
      res.status(500).send("problème avec la bdd ");
    });
});

module.exports = usersRouter;
