export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    language?: string;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    averageRating?: number;
    ratingsCount?: number;
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
  };
}

export interface BooksResponse {
  kind: string;
  totalItems: number;
  items?: Book[]; // items can be undefined if totalItems is 0
}

export interface SearchParams {
  query: string;
  startIndex?: number;
  maxResults?: number;
  orderBy?: "relevance" | "newest";
  filter?: "partial" | "full" | "free-ebooks" | "paid-ebooks" | "ebooks";
}
