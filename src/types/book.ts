export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    publisher?: string;
    pageCount?: number;
    categories?: string[];
    language?: string;
  };
}

export interface BooksResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

export interface SearchParams {
  query: string;
  startIndex?: number;
  maxResults?: number;
} 