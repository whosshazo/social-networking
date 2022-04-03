const { Schema, model } = require("mongoose");
const { Thoughts } = require(".");
const dateFormat = require("../utils/dateFormat");

const ThoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "text is required",
      minlength: 1,
      maxlength: 280,
    },
    ceatedAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: "Username is required",
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thoughts = model("Thoughts", ThoughtsSchema);

module.exports = Thoughts;
