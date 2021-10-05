const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Incorrect form submission");
  }
  db.select("email", "hash")
    .from("login")
    .where({ email: email })
    .then((data) => {
      bcrypt.compare(password, data[0].hash, function (err, result) {
        if (result) {
          return db
            .select("*")
            .from("users")
            .where({ email: req.body.email })
            .then((users) => {
              res.json(users[0]);
            })
            .catch((err) => {
              res.status(400).json("Unable to get users");
            });
        } else {
          res.status(400).json("Wrong credential");
        }
        // result == true
      });
    })
    .catch((err) => res.status(400).json("Something Wrong"));
};
module.exports = {
  handleSignin,
};
