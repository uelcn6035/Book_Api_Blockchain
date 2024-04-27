import { param } from "express-validator";
export const validateBookTitle = param("title")
    .isString()
    .notEmpty()
    .withMessage("Book title must be a non-empty string");
//# sourceMappingURL=validators.js.map