import express from 'express';
import { getAllBooks, getBooksByTitleOrAuthor, getBookById, addBook, updateBook, deleteBook } from '../controllers/booksControllers.js';

const router = express.Router();

router.get("/search", getBooksByTitleOrAuthor);

router.get('/:id', getBookById);
  
router.get("/", getAllBooks);
  
router.post('/', addBook);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

export default router;  