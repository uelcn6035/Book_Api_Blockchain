
// Importing faker for generating fake data
import faker from 'faker';
import { storeBookData } from "../helpers/helper.js";

// Function to generate book data
export const generateBookData = (title: string) => {

   // Generating book data using faker
  const generatedBookData = {
    title,
    image: `https://picsum.photos/200/300`,
    author: faker.name.findName(),
    publicationYear: faker.date.past().getFullYear(),
    genre: faker.random.arrayElement(["Fiction", "Non-fiction", "Sci-Fi", "Fantasy", "Mystery", "Biography"]),
    summary: `This is a ${faker.random.arrayElement(["captivating", "intriguing", "fascinating"])} ${faker.random.arrayElement(["story", "tale"])} about ${faker.random.arrayElement(["love", "adventure", "mystery", "discovery"])}. ` +
         `Set in ${faker.address.country()}, it's a ${faker.random.arrayElement(["heartwarming", "heartbreaking", "suspenseful", "thought-provoking"])} ${faker.random.arrayElement(["journey", "adventure", "exploration", "discovery"])} of ${faker.random.arrayElement(["friendship", "love", "loss", "hope"])}. ` +
         `With its ${faker.random.arrayElement(["richly drawn characters", "twisting plot", "vivid descriptions", "sharp dialogue"])}, this book will ${faker.random.arrayElement(["keep you on the edge of your seat", "make you laugh and cry", "make you think deeply", "transport you to another world"])}. ` +
         `The ${faker.random.arrayElement(["unexpected twists and turns", "emotional ups and downs", "intricate plot developments", "deeply relatable characters"])} will keep you ${faker.random.arrayElement(["hooked from the first page to the last", "coming back for more", "thinking about it long after you've finished reading", "eagerly awaiting the next book in the series"])}.`,
    pages: faker.datatype.number({ min: 100, max: 1000 }),
    publisher: faker.company.companyName(),
    isbn: faker.random.alphaNumeric(13),
    reviews: Array.from({ length: 6 }, () => ({
      reviewer: faker.name.findName(),
      rating: faker.datatype.number({ min: 1, max: 5 }),
      text: `I found this book to be ${faker.random.arrayElement(["excellent", "good", "fair", "poor"])}.`,
    })),
    // Add this line to generate the full content of the book
    content: faker.lorem.paragraphs(50),
  };

  // Create a copy of the generatedBookData object without the content field
  const bookDataToStore = { ...generatedBookData };
  delete bookDataToStore.content;  delete bookDataToStore.summary;

  // Storing the book data
  storeBookData(bookDataToStore).catch(console.error);

  return generatedBookData;
};
