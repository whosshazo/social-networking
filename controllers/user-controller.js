const { User, Friends } = require("../models");

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
  getSingleUser(req, res) {
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

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  //add Friend
  addFriend({ params, body }, res) {
    this.addFriend
      .findOneAndUpdate(
        { _id: params.friendId },
        { $addToSet: { friend: body } },
        { new: true, runValidators: true }
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Sorry, zero friends for this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // remove Friend
  removeFriend({ params }, res) {
    Friends.findOneAndUpdate(
      { _id: params.friendId },
      { $pull: { friend: { friendId: params.friendId } } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
