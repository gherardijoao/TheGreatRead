import { useState, useCallback } from "react";
import type { Book, BooksResponse } from "../types/book";
import { bookService } from "../services/bookService";

// Updated classic terms in both English and Portuguese
const classicTermsEN = [
  "classic literature",
  "great gatsby",
  "moby dick",
  "war and peace",
  "pride and prejudice",
  "jane austen",
  "fyodor dostoevsky",
  "charles dickens",
  "william shakespeare",
  "homer odyssey",
  "dante inferno",
  "cervantes don quixote",
  "tolstoy",
  "emily bronte",
  "virginia woolf",
];

const classicTermsPT = [
  "literatura clássica",
  "grande gatsby",
  "moby dick",
  "guerra e paz",
  "orgulho e preconceito",
  "jane austen",
  "fiodor dostoiévski",
  "charles dickens",
  "william shakespeare",
  "odisseia de homero",
  "inferno de dante",
  "dom quixote de cervantes",
  "tolstói",
  "emily brontë",
  "virginia woolf",
];

// Combined terms for search variety
const allClassicTerms = [...classicTermsEN, ...classicTermsPT];

// Filter function to determine if a book is considered a "classic" in either language
export const isClassicBook = (book: any): boolean => {
  if (!book || !book.volumeInfo) return false;

  // Check if published before 1960 (arbitrary cutoff for "classics")
  const publishYear = book.volumeInfo.publishedDate
    ? parseInt(book.volumeInfo.publishedDate.slice(0, 4))
    : null;
  const isOldEnough = publishYear && publishYear < 1960;

  // Check for classic authors or keywords in title/categories
  const title = book.volumeInfo.title?.toLowerCase() || "";
  const authors = book.volumeInfo.authors || [];
  const categories = book.volumeInfo.categories || [];

  // Check in Portuguese and English
  const hasClassicKeywordsEN =
    title.includes("classic") ||
    categories.some(
      (cat: string) =>
        cat.toLowerCase().includes("classic") ||
        cat.toLowerCase().includes("literature")
    );

  const hasClassicKeywordsPT =
    title.includes("clássic") ||
    title.includes("classic") ||
    categories.some(
      (cat: string) =>
        cat.toLowerCase().includes("clássic") ||
        cat.toLowerCase().includes("literatura")
    );

  // Check for educational publisher in both languages
  const publisher = book.volumeInfo.publisher?.toLowerCase() || "";
  const isEducationalPublisher =
    publisher.includes("university") ||
    publisher.includes("college") ||
    publisher.includes("penguin classics") ||
    publisher.includes("oxford") ||
    publisher.includes("universidade") ||
    publisher.includes("companhia das letras") ||
    publisher.includes("editora 34") ||
    publisher.includes("martins fontes");

  // Return true if the book is either old enough, has classic keywords, or from an educational publisher
  return (
    isOldEnough ||
    hasClassicKeywordsEN ||
    hasClassicKeywordsPT ||
    isEducationalPublisher
  );
};

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [language, setLanguage] = useState<"en" | "pt" | "both">("both");

  const searchBooks = useCallback(
    async (
      query: string,
      startIndex = 0,
      maxResults = 20,
      lang?: "en" | "pt" | "both"
    ) => {
      try {
        setLoading(true);
        setError(null);

        // Apply language filter if specified
        const currentLang = lang || language;
        let finalQuery = query;

        if (currentLang === "en") {
          finalQuery = `${query} language:en`;
        } else if (currentLang === "pt") {
          finalQuery = `${query} language:pt`;
        }

        const response = await bookService.searchBooks({
          query: finalQuery,
          startIndex,
          maxResults,
        });

        const items = response.items || [];
        setBooks(items);
        setTotalItems(response.totalItems);
        return response;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while searching books"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [language]
  );

  const searchClassics = useCallback(
    async (startIndex = 0, maxResults = 20, lang?: "en" | "pt" | "both") => {
      // Select terms based on language preference
      const currentLang = lang || language;
      let termsToUse = allClassicTerms;

      if (currentLang === "en") {
        termsToUse = classicTermsEN;
      } else if (currentLang === "pt") {
        termsToUse = classicTermsPT;
      }

      // Pick a random term to search for
      const randomTerm =
        termsToUse[Math.floor(Math.random() * termsToUse.length)];
      return searchBooks(randomTerm, startIndex, maxResults, currentLang);
    },
    [searchBooks, language]
  );

  const getBookById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const book = await bookService.getBookById(id);
      return book;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching book details"
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const setPreferredLanguage = (lang: "en" | "pt" | "both") => {
    setLanguage(lang);
  };

  return {
    books,
    loading,
    error,
    totalItems,
    language,
    searchBooks,
    searchClassics,
    getBookById,
    setPreferredLanguage,
  };
};
