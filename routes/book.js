import express from "express";

import { isAuthenticated } from "../middlewares/auth.js";
import {
  createBook,
  getAllBooks,
  getBookByNumberOrISBN,
  getBookReviewByISBN,
  getBooksByAuthor,
  getBooksByTitle,
} from "../controllers/book.js";

const router = express.Router();

router.post("/new", isAuthenticated, createBook);
router.get("/books", isAuthenticated, getAllBooks);
router.get("/book/isbn/:isbn", isAuthenticated, getBookByNumberOrISBN);
router.get("/title/:title", isAuthenticated, getBooksByTitle);
router.get("/review/:isbn", isAuthenticated, getBookReviewByISBN);
router.get("/author/:author", getBooksByAuthor);
export default router;
