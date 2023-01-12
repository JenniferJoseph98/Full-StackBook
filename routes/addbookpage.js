const addBook = require("express").Router();
const Bookmodel = require("../model/bookmodel");
addBook.post("/addbook", async (req, res) => {
  try {
    console.log(req.body.bookdetails);
    const { bookdetails } = req.body;
    console.log(bookdetails);
    const book = await Bookmodel.create(bookdetails);
    res.send(book);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
addBook.get("/getallbooks/:id", async (req, res) => {
  try {
    const booklist = await Bookmodel.find({ user: req.params.id });
    console.log(booklist);
    res.send(booklist);
  } catch (error) {
    res.send(error);
  }
});
addBook.put("/update/:id", async (req, res) => {
  try {
    const { title, author, ISBN, publish_date, publisher, description, _id } =
      req.body.bookdetails;
    const bookupdate = await Bookmodel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      { title, author, ISBN, publish_date, publisher, description },
      {
        new: true,
      }
    );
    // console.log(bookdelete);
    res.send("Hi");
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});
addBook.delete("/delete/:id", async (req, res) => {
  try {
    const bookdelete = await Bookmodel.findByIdAndDelete({
      _id: req.params.id,
    });
    console.log("Deleted");
    res.send("Deleted");
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});
module.exports = addBook;
