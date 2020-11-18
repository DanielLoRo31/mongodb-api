const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: async function (value) {
          return new Promise((res, rej) => {
            setTimeout(() => {
              if (value && value.includes("@")) {
                res(true);
              } else {
                rej(false);
              }
            }, 5000);
          });
        },
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["teacher", "student"],
    },
    name: String,
    score: {
      type: Number,
      min: 1,
      max: 5,
    },
    description: String,
  },
  {
    strict: true,
    collection: "UserCollection",
  }
);

module.exports = mongoose.model("User", User);
