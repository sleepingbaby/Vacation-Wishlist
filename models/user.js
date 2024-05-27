const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
});

module.exports = mongoose.model("User", userSchema);
