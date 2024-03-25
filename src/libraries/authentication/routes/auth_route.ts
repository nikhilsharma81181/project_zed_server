import express from "express";
import controller from "../controller/auth_ctrl";

const router = express.Router();

router.post("/send-otp", controller.sendOtp);
router.post("/verify-otp", controller.verifyOtp);
router.post("/google-sso", controller.verifyGoogleSignIn);

export = router;
