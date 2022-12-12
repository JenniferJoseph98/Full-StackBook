const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true },
  publisher: { type: String, required: true },
  publish_date: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "users" },
});
module.exports = mongoose.model("books", BookSchema);
