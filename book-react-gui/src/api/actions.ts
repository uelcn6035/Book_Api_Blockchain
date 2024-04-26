import axios, { AxiosError } from "axios";

const API_URL = "https://upgraded-robot-pvpwwjjgj9pc76wx-3000.app.github.dev/api";

export const getBookData = async (title: string): Promise<Book> => {
  return new Promise<Book>((resolve, reject) => {
    axios
      .get(`${API_URL}/books/${title}`)
      .then((res) => {
        resolve(res.data);
      })
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
