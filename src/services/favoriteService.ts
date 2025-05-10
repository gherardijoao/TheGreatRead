import type { Book } from "../types/book";

// Key for storing favorites in localStorage
const FAVORITES_STORAGE_KEY = "the-great-read-favorites";

// FavoritesService for managing user's favorite books
export const favoritesService = {
  // Get all favorites from localStorage
  getFavorites: (): Book[] => {
    const favoritesJson = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!favoritesJson) return [];

    try {
      return JSON.parse(favoritesJson);
    } catch (error) {
      console.error("Error parsing favorites from localStorage", error);
      return [];
    }
  },

  // Add a book to favorites
  addFavorite: (book: Book): void => {
    const favorites = favoritesService.getFavorites();

    // Check if book already exists in favorites
    if (!favorites.some((fav) => fav.id === book.id)) {
      const updatedFavorites = [...favorites, book];
      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(updatedFavorites)
      );
    }
  },

  // Remove a book from favorites
  removeFavorite: (bookId: string): void => {
    const favorites = favoritesService.getFavorites();
    const updatedFavorites = favorites.filter((book) => book.id !== bookId);
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(updatedFavorites)
    );
  },

  // Check if a book is favorited
  isFavorite: (bookId: string): boolean => {
    const favorites = favoritesService.getFavorites();
    return favorites.some((book) => book.id === bookId);
  },
};
