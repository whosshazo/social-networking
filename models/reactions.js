const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    cretedAt: {
      type: Date,
      default: Date.now,
      get: (timeStamp) => dateFormat(timeStamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },

    id: false,
  }
);

module.exports = ReactionSchema;
