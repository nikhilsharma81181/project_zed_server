"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_ctrl_1 = __importDefault(require("../controllers/user_ctrl"));
const router = express_1.default.Router();
router.post("/create", user_ctrl_1.default.createUser);
router.get("/get/:userId", user_ctrl_1.default.readUser);
router.get("/get/", user_ctrl_1.default.readAllUser);
router.post("/update/:userId", user_ctrl_1.default.updateUser);
router.delete("/delete/:userId", user_ctrl_1.default.deleteUser);
module.exports = router;
