import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

// 1. Imports from local files
import User from "./src/models/user.model.js";
import Note from "./src/models/note.model.js";
import authenticateToken from "./utilities.js";
import path from "path";
import userRoutes from "./src/routes/userRoutes.js";
import noteRoutes from "./src/routes/noteRoutes.js";

const app = express();

const __dirname = path.resolve();

/* 
   2. MIDDLEWARE CONFIGURATION (CRITICAL STEP)
   These must come BEFORE your app.post or app.get routes.
*/
app.use(express.json()); // Parses the incoming JSON body

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      
  credentials: true
    }),
  );
}

// 3. DATABASE CONNECTION

mongoose.connect(process.env.MONGODB_URI);

// ---------------------BACKEND READY--------------------------

// 4. ROUTE DEFINITIONS
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/notes-app/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../frontend/notes-app/dist/index.html"),
    );
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(PORT));

export default app;
