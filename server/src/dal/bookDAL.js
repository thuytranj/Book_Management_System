import books from '../../data/books.js';
let nextId = books.length + 1;

class BookDAL {
    getAllBooks() {
        return books;
    }

    getBookById(id) {
        return books.find(book => book.id === id);
    }

    getBookByTitleOrAuthor(search) {
        const keyword = search.trim().toLowerCase();

        if (!keyword) return books;

        return books.filter((book) => {
          const title = book.title.toLowerCase();
          const author = book.author.toLowerCase();

          return title.includes(keyword) || author.includes(keyword);
        });
    }

    addBook(bookData) {
        const newBook = { id: nextId++, ...bookData };
        books.push(newBook);
        return newBook;
    }

    updateBook(id, updatedData) {
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex === -1) return null;

        books[bookIndex] = { ...books[bookIndex], ...updatedData };
        return books[bookIndex];
    }

    deleteBook(id) {
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex === -1) return false;

        books.splice(bookIndex, 1);
        return true;
    }
}

export default new BookDAL();