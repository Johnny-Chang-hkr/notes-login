import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

// 1. Imports from local files
import User from "./models/user.model.js";
import Note from "./models/note.model.js";
import authenticateToken from "./utilities.js";

const app = express();

/* 
   2. MIDDLEWARE CONFIGURATION (CRITICAL STEP)
   These must come BEFORE your app.post or app.get routes.
*/
app.use(express.json()); // Parses the incoming JSON body

app.use(
  cors({
    origin: "*",
  }),
);

// 3. DATABASE CONNECTION
dotenv.config();
mongoose.connect(process.env.MONGODB_URI);


// ---------------------BACKEND READY--------------------------

// 4. ROUTE DEFINITIONS
app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

// Create Account
app.post("/create-account", async (req, res) => {
  /* 
     If express.json() is above this line, req.body will exist.
     If it crashes here, check if you are sending "Content-Type: application/json" 
     in your frontend request.
  */
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.status(400).json({
      error: true,
      message: "User already exists",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Successful",
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // 1. Fetch user
  const userInfo = await User.findOne({ email: email });

  // 2. CHECK IF USER EXISTS FIRST (The Bug Fix)
  if (!userInfo) {
    return res.status(400).json({
      error: true,
      message: "User not found",
    });
  }

  // 3. Now it is safe to check the password
  if (userInfo.password === password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

// Get user
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Edit a note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Get all notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Delete a note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  // 1. Fixed typo: changed 'paras' to 'params'
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    // 2. Renamed the result to 'note' (previously shadowed 'noteId')
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    // 3. Changed check to 'note' (matches the variable above)
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    // 4. Perform the deletion
    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.json({ error: false, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error); // Helpful for debugging
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Update isPinned Value
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// Search Notes
app.get("/search-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({error: true, message: "Search query is required" })     
  }

  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        {title: { $regex: new RegExp(query, "i")}},
        {content: { $regex: new RegExp(query, "i")}},
      ],
    });

    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully",
    })
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",

    })
  }

});

app.listen(process.env.PORT);

export default app;
