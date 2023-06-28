const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./config");

const CREATE_USER = (req, res) => {
  let haspassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: haspassword,
    phone: req.body.phone,
  })
    .then(() => {
      res.status(201).send("Registration Successful");
    })
    .catch(function (err) {
      res.status(422).send(err);
    });
};
const USER_LOGIN = async (req, res) => {
  try {
    const check = await User.findOne({ email: req.body.email });
    if (!check) {
      res.status(401).json("No Email Found,Please Register First");
    } else {
      const passIsValid = bcrypt.compareSync(req.body.password, check.password);
      if (!passIsValid) {
        res.status(401).json("Invalid Password");
      }
      console.log("I am Here");
      const { password, ...others } = check._doc;
      let token = jwt.sign(
        { id: check._id, isAdmin: check.isAdmin },
        config.secret,
        {
          expiresIn: "3d",
        }
      );
      console.log(token);
      res.status(200).json({ ...others, token });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const GET_USERS = async (req, res) => {
  try {
    User.find({}).then((cruds) => {
      res.json(cruds);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
const USER_UPDATE = async (req, res) => {
  if (req.user.id === req.params.id) {
    let haspassword = bcrypt.hashSync(req.body.password, 8);
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(400).json("User Not Found");
  }
};
const USER_DELETE = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User Has been Deleted !!!");
    } catch (error) {
      res.status(500).json(error);
    }
  
};
module.exports = {
  CREATE_USER,
  USER_LOGIN,
  GET_USERS,
  USER_UPDATE,
  USER_DELETE,
};
