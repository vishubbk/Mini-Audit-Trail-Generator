import dotenv from "dotenv";
dotenv.config(); // Load environment variables first

import express from "express";
import connect from "./db/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import api from "./routes/data.js";

const app = express();

// DB connect after env load
connect();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Setup
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mini-audit-trail-generator-teau.onrender.com/"], // apna frontend URL daalna
    credentials: true,
  })
);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/data", api);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
