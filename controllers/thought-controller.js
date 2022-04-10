const { Thought, User } = require("../models");

const thoughtController = {
  // all thoughts
  getThought(req, res) {
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
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.UserId },
          { $addToSet: { thoughts: dbThoughtData._id } },
          { new: true }
        );
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
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { thoughts: params.thoughtId },
          { $addToSet: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(() => res.json())
      .catch((err) => res.json(err));
  },

  //add Reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.reactionId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
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
    Thought.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { reaction: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
