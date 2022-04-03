const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Username is required",
            trim: true
        },
        email: {
            type: String,
            required: "Email is required",
            unique: true,
            match: [/.+@.+\..+/]
        },
        thoughts: [ThoughtsSchema],

        friends: [UserSchema]
    }
);

const User = model("User", UserSchema);

module.exports = User; 