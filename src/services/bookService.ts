import type { Book, BooksResponse, SearchParams } from "../types/book";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

// Added new search parameters and response caching
const cache = new Map<string, BooksResponse>();

export const bookService = {
  async searchBooks({
    query,
    startIndex = 0,
    maxResults = 20,
    orderBy = "relevance",
    filter = "partial",
  }: SearchParams): Promise<BooksResponse> {
    const cacheKey = `${query}-${startIndex}-${maxResults}-${orderBy}-${filter}`;

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    const url = new URL(BASE_URL);
    url.searchParams.set("q", query);
    url.searchParams.set("startIndex", startIndex.toString());
    url.searchParams.set("maxResults", maxResults.toString());
    url.searchParams.set("orderBy", orderBy);
    url.searchParams.set("filter", filter);
    url.searchParams.set("printType", "books");
    url.searchParams.set("projection", "lite");

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();
    cache.set(cacheKey, data);
    return data;
  },

  async getBookById(id: string): Promise<Book> {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch book details");
    }

    return response.json();
  },
};
