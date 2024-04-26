import express from "express";
import { getBookData } from "../controllers/bookController.js";
import { validateBookTitle } from "../middleware/validators.js";

const router = express.Router();

router.get("/:title", validateBookTitle, getBookData);

export default router;
