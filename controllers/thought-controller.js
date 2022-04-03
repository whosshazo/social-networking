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

  
}