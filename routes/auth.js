const authRouter = require("express").Router();
const User = require("../models/User");

authRouter.post("/checkCredentials", (req, res) => {
  if (req.body.password.length < 8) {
    res.status(401).send("password too short");
  } else {
    User.authentication(req.body)
      .then((result) => {
        result ? res.sendStatus(200) : res.sendStatus(401);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("problème d'accès à la bdd");
      });
  }
});

module.exports = authRouter;
