import { useState, useCallback } from 'react';
import type { Book, BooksResponse } from '../types/book';
import { bookService } from '../services/bookService';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  const searchBooks = useCallback(async (query: string, startIndex = 0) => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookService.searchBooks({ query, startIndex });
      setBooks(response.items || []);
      setTotalItems(response.totalItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching books');
    } finally {
      setLoading(false);
    }
  }, []);

  const getBookById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const book = await bookService.getBookById(id);
      return book;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching book details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    books,
    loading,
    error,
    totalItems,
    searchBooks,
    getBookById,
  };
}; 