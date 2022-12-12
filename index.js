const express = require("express");
const loginroutes = require("./routes/login");
const addBook = require("./routes/addbookpage");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
app.use("/api/user", loginroutes);
app.use("/api/book", addBook);
app.get("/", async (req, res) => {
  res.send("HI");
});
mongoose.connect(process.env.MONGO_DB_URL, () => {
  console.log("Mongoose connected");
});
app.listen(8000, () => {
  console.log("Server connected");
});
