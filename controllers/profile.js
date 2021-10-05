const handleGetProfile = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .where({ id })
    .from("users")
    .then((users) => {
      if (users.length) {
        res.json(users[0]);
      } else {
        res.status(400).json("Not found");
      }
    })
    .catch((error) => {
      res.status(400).json("Error geting users");
    });
};
module.exports = {
  handleGetProfile,
};
