const { Thought, User } = require("../models");

const thoughtController = {
  // all thoughts
  getThroughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },

  // single Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "Sorry, zero thoughts for this id!" });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },

  // create Thought
  createThought(req, res) {
    Thought.create(req, body)
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  },

  //update Thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Sorry, zero thoughts for this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  //add Reaction
  addReaction({ params, body }, res) {
    this.addReaction
      .findOneAndUpdate(
        { _id: params.reactionId },
        { $push: { reaction: body } },
        { new: true, runvalidators: true }
      )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Sory, zero thoughts for this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //remove Reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdata(
      { _id: params.commentId },
      { $pull: { reaction: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = commentController;
