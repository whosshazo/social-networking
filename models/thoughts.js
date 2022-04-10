const { Schema, model } = require("mongoose");
const Reaction = require("./reactions");
const dateFormat = require("../utils/dateFormat");

const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    ceatedAt: {
      type: Date,
      default: Date.now,
      get: timeStamp => dateFormat(timeStamp)
    },
    username: {
      type: String,
      required: true,
    },

    reactions: [Reaction],
  },
  {
    toJSON: {
      getters: true,
    },

    id: false,
  }
);

const Thoughts = model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;
