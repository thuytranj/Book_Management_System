import bookDAL from '../dal/bookDAL.js';

class BookService {
    getAllBooks() {
        return bookDAL.getAllBooks();
    }

    getBookById(id) {
        return bookDAL.getBookById(id);
    }

    getBookByTitleOrAuthor(search) {
        return bookDAL.getBookByTitleOrAuthor(search);
    }

    addBook(bookData) {
        if (!bookData.title || bookData.title.trim() === '') {
            return { error: 'Title is required' };
        }

        if (!bookData.author || bookData.author.trim() === '') {
            return { error: 'Author is required' };
        }

        if (!bookData.category || bookData.category.trim() === '') {
            return { error: 'Category is required' };
        }

        if (!bookData.publishedYear || isNaN(bookData.publishedYear) || bookData.publishedYear <= 0 || bookData.publishedYear > new Date().getFullYear()) {
            return { error: 'Published year must be a valid number' };
        }

        return {success: bookDAL.addBook(bookData)};
    }

    updateBook(id, updatedData) {
        if (!updatedData.title || updatedData.title.trim() === "") {
          return { error: "Title is required" };
        }

        if (!updatedData.author || updatedData.author.trim() === "") {
          return { error: "Author is required" };
        }

        if (!updatedData.category || updatedData.category.trim() === "") {
          return { error: "Category is required" };
        }

        if (
          !updatedData.publishedYear ||
          isNaN(updatedData.publishedYear) ||
          updatedData.publishedYear <= 0 ||
          updatedData.publishedYear > new Date().getFullYear()
        ) {
          return { error: "Published year must be a valid number" };
        }

        const updatedBook = bookDAL.updateBook(id, updatedData);
        if (!updatedBook) {
            return { error: 'Book not found' };
        }

        return { success: updatedBook };
    }

    deleteBook(id) {
        const deleted = bookDAL.deleteBook(id);
        if (!deleted) {
            return { error: 'Book not found' };
        }
        return { success: deleted };
    }
}

export default new BookService();