import { generateBookData } from "../services/bookService.js";
import { validationResult } from "express-validator";
export const getBookData = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error("Validation error", errors.mapped());
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        let { title } = req.params;
        title = title.charAt(0).toUpperCase() + title.slice(1); // Capitalize the first letter
        const finalBookData = generateBookData(title);
        res.status(200).json(finalBookData);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error in fetching book data");
    }
};
//# sourceMappingURL=bookController.js.map