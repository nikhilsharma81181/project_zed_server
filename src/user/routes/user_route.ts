import express from "express";
import controller from "../controller/user_ctrl";
import { authenticateJWT } from "../../middleware/auth_middleware";

const router = express.Router();

router.post("/",  controller.createUser);
router.get("/", authenticateJWT, controller.readUser);
router.patch("/", authenticateJWT, controller.updateUser);
router.delete("/", authenticateJWT, controller.deleteUser);

export = router;
