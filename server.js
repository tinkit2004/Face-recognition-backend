const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image.js");
const saltRounds = 10;

const app = express();
const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart-brain",
  },
});
db.select("*").from("users");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("this is Andy");
});
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt, saltRounds);
});
app.get("/profile/:id", (req, res) => {
  profile.handleGetProfile(req, res, db);
});
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res);
});
app.listen(process.env.PORT || 3000, () => {
  console.log("My app is running");
});
/**
 * /-->res = this is working
 * /signin -->POST = success/ fail
 * /register --> POST = user object
 * /profile/:userId --> GET = user object
 * /image --> PUT --> user object
 */
