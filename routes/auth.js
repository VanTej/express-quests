const authRouter = require("express").Router();
const User = require("../models/User");
const { calculateToken } = require("../helpers/users");

authRouter.post("/checkCredentials", (req, res) => {
  const { email, password } = req.body;
  if (password.length < 8) {
    res.status(401).send("password too short");
  } else {
    User.authentication(req.body)
      .then((result) => {
        User.verifyPassword(password, result[0].hashedPassword).then(
          (authenticated) => {
            if (authenticated) {
              const id = result[0].id;
              const token = calculateToken(email, id);
              res
                .cookie("user_token", token)
                .sendStatus(200);
            } else {
              res.sendStatus(401);
            }
          }
        );
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("problème d'accès à la bdd");
      });
  }
});

module.exports = authRouter;
