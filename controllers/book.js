import ErrorHandler from "../middlewares/errorHandling.js";
import { Book } from "../models/book.js";

export const createBook = async (req, res) => {
  try {
    const { title, author ,isbn} = req.body;


    const newBook = new Book({
      title,
      author,
      reviews: {}, 
      isbn,
    });


    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllBooks = async (req, res) => {
  try {

    const books = await Book.find().sort({ isbn: 1 });


    const booksFormatted = {};
    books.forEach((book) => {
      booksFormatted[book.isbn] = {
        author: book.author,
        title: book.title,
        reviews: book.reviews || {},
      };
    });


    res.json({ books: booksFormatted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookByNumberOrISBN = async (req, res) => {
  try {
    const isbn = req.params.isbn; 
    console.log((isbn));

    const book = await Book.findOne({ isbn });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }


    const bookFormatted = {
      author: book.author,
      title: book.title,
      reviews: book.reviews || {},
    };


    res.json({ book: bookFormatted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBooksByTitle = async (req, res) => {
  try {
    const title = req.params.title; 

 
    const books = await Book.find({ title });

    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found for the title" });
    }


    const booksFormatted = books.map((book) => ({
      isbn: book.isbn,
      author: book.author,
      reviews: book.reviews || {},
    }));


    res.json({ booksbytitle: booksFormatted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBookReviewByISBN = async (req, res) => {
  try {
    const isbn = req.params.isbn; 


    const book = await Book.findOne({ isbn });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const review = book.reviews || {};

    res.json({ review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooksByAuthor = async (req, res) => {
  try {
    const author = req.params.author; 

   
    const books = await Book.find({ author });

   
    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found for the author" });
    }

    
    const booksFormatted = books.map((book) => ({
      isbn: book.isbn,
      title: book.title,
      reviews: book.reviews || {},
    }));

   
    res.json({ booksbyauthor: booksFormatted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};