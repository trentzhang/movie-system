// app.js
import express from "express";
import { homepage } from "./functions/homepage.mjs";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/homepage", homepage);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
