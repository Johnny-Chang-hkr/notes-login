import express from "express";
import { createAccount, getUser, loginUser } from "../controllers/userController.js";
import authenticateToken from "../../utilities.js";

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", loginUser);
router.get("/get-user", authenticateToken, getUser);




export default router;
