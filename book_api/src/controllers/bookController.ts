import { Request, Response } from "express";
import { generateBookData } from "../services/bookService.js";
import { validationResult } from "express-validator";

// Function to get book data
export const getBookData = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  // If there are validation errors, send a 400 response with the errors
  if (!errors.isEmpty()) {
    console.error("Validation error", errors.mapped());
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    let { title } = req.params;
    title = title.charAt(0).toUpperCase() + title.slice(1); // Capitalize the first letter

    // Generating book data
    const finalBookData = generateBookData(title);

    res.status(200).json(finalBookData);
  } catch (error) { 
    console.error(error);
    res.status(500).send("Error in fetching book data");
  }
};



