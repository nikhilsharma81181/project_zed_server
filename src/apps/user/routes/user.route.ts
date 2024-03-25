import express from "express";
import {
  createUserController,
  readUserController,
  updateUserController,
  deleteUserController,
} from "../controller/user.controller";
import { authenticateJWT } from "../../../libraries/middleware/auth_middleware";

const router = express.Router();

router.post("/", createUserController);
router.get("/", authenticateJWT, readUserController);
router.patch("/", authenticateJWT, updateUserController);
router.delete("/", authenticateJWT, deleteUserController);

export = router;
