import express from "express";
import authenticateToken from "../../utilities.js";
import {
  addNote,
  deleteANote,
  editNote,
  getAllNotes,
  searchNote,
  updatePinnedValue,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/add-note", authenticateToken, addNote);
router.put("/edit-note/:noteId", authenticateToken, editNote);
router.get("/get-all-notes", authenticateToken, getAllNotes);
router.delete("/delete-note/:noteId", authenticateToken, deleteANote);
router.put("/update-note-pinned/:noteId", authenticateToken, updatePinnedValue);
router.get("/search-notes", authenticateToken, searchNote);

export default router;
