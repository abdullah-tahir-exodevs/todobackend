const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    status: { type: Boolean, default: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
