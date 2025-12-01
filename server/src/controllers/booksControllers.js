import bookService from '../services/bookService.js';

export const getAllBooks = (req, res) => {
  res.json(bookService.getAllBooks());
}

export const getBooksByTitleOrAuthor = (req, res) => {
  const {str = ''} = req.query;
  const books = bookService.getBookByTitleOrAuthor(str);
  res.json(books);
}

export const getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  const book = bookService.getBookById(id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
}

export const addBook = (req, res) => {
  const bookData = req.body;
  const result = bookService.addBook(bookData);
  if (result.error) {
    res.status(400).json({ error: result.error });
  } else {
    res.status(201).json(result.success);
  }
}

export const updateBook = (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const result = bookService.updateBook(id, updatedData);
  if (result.error) {
    res.status(400).json({ error: result.error });
  } else {
    res.json(result.success);
  }
}

export const deleteBook = (req, res) => {
  const id = parseInt(req.params.id);
  const success = bookService.deleteBook(id);
  if (success) {
    res.json({ message: "Book deleted successfully" });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
};