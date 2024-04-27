// Importing axios and AxiosError for making HTTP requests and handling errors
import axios, { AxiosError } from "axios";

// Defining the base URL for the API
const API_URL = "https://legendary-dollop-44wvvjjg74xfqq6r-3000.app.github.dev/api";

// Function to get book data from the API
export const getBookData = async (title: string): Promise<Book> => {
  return new Promise<Book>((resolve, reject) => {
    axios
      .get(`${API_URL}/books/${title}`)
      .then((res) => {
        resolve(res.data); // Resolving the promise with the response data
      })

       // Rejecting the promise with a custom error message
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) { 
            reject("Book not found");
          } else {
            reject(axiosError.message);
          }
        } else {
          reject("An unknown error occurred");
        }
      });
  });
};
