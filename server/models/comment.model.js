const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  text: {
    type: String
  },

  gameId: {
    type: Number
  },

}, {timestamps: true})

module.exports = mongoose.model("Comment", CommentSchema);