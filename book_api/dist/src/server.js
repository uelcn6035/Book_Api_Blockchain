import express from "express";
import bookRoute from "./routes/bookRoute.js";
import configRoute from "./routes/configRoute.js"; // import the new route
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use("/api/books", bookRoute);
app.use("/api/config", configRoute); // use the new route
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map