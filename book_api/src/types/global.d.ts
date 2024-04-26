interface Book {
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
  summary: string;
  pages: number;
  publisher: string;
  isbn: string;
  image: string;
  reviews: Review[];
  content: string; // Add this line
}

interface Review {
  reviewer: string;
  rating: number;
  text: string;
}
