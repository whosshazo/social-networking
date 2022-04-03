const { Thought, User } = require('../models');

const thoughtController = {
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

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((dbThoughtData) => {
                if(!dbThoughtData) {
                    return res.status(404).json({ message: "Sorry, zero thoughts for this id!" });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    },

    
}