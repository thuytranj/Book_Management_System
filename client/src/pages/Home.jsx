import React from "react";
import Header from "../components/Header.jsx";
import Menu from "../components/Menu.jsx";
import BookItem from "../components/BookItem.jsx";
import api from "@/lib/axios.js";
import { useEffect, useState, useMemo } from "react";
import { useContext } from "react";
import { BookContext } from "../context/BookProvider.jsx";
import { useDebounce } from "use-debounce";

const Home = () => {
  const [books, setBooks] = useState([]);
  const { selectedCategory, setSelectedCategory, categories, setCategories, searchQuery } = useContext(BookContext);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 200);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchBooks(query="") {
    try {
      const url = query ? `/books/search?str=${query}` : "/books";

      const res = await api.get(url);
      const data = res.data;

      if (!query) {
        const categories = [
          "All",
          ...new Set(data.map((book) => book.category)),
        ];
        setCategories(categories);
      }
      
      setBooks(data);
    } catch (error) {
      console.log("Error fetching books:", error);
      setError("Failed to load books. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchBooks(debouncedSearchQuery);
  }, [debouncedSearchQuery]);


  const filteredBooks = useMemo(() => {
    return selectedCategory === "All"
      ? books
      : books.filter((book) => book.category === selectedCategory);
  }, [books, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSuccess = () => {
    fetchBooks();
  };

  return (
    <>
      <Header onSuccess={handleSuccess} />
      <div className="flex flex-col md:flex-row gap-4">
        <Menu onCategorySelect={handleCategorySelect} />

        <div className="flex-1 flex flex-col gap-4 bg-gray-50 min-h-screen p-4">
          <p className="text-xl font-semibold">{selectedCategory} Books</p>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && filteredBooks.length === 0 && <p>No books found.</p>}

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredBooks.map((book) => (
              <BookItem key={book.id} book={book} onSuccess={handleSuccess} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
