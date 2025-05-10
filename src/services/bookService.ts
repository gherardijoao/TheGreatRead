import type { Book, BooksResponse, SearchParams } from '../types/book';

const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

export const bookService = {
  async searchBooks({ query, startIndex = 0, maxResults = 20 }: SearchParams): Promise<BooksResponse> {
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    
    return response.json();
  },

  async getBookById(id: string): Promise<Book> {
    const response = await fetch(`${BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }
    
    return response.json();
  }
}; 