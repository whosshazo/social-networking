const { User } = require("../models");

const userController = {
  //all Users
  getUsers(req, res) {
    User.find()
      .sort({ createdAt: -1 })
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },

  // single User
  getSingelUser(req, res) {
    User.findOne({ _id: req.params.thoughtId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Sorry, zero users for this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },

  // create User
  createUser(req, res) {
    User.create(req, body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },

  //update User
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: " Sorry, zero users for this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};
