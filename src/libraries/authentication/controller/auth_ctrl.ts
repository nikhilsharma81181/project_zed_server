import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../../apps/user/model/user.model";
import admin from "firebase-admin";
const JWT_SECRET =
  process.env.JWT_SECRET || "TheB7cSbVyLvahq5BetpbcV/LccVBDnm+5GBMG6q5aA=";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;
const twillioClient = require("twilio")(accountSid, authToken);

const sendOtp = (req: Request, res: Response) => {
  const phone = req.body.phone;

  twillioClient.verify.v2
    .services(verifySid)
    .verifications.create({ to: phone, channel: "sms" })
    .then((verification: { status: any }) => {
      console.log(verification.status);
      res.send({ message: "OTP sent!" });
    })
    .catch((error: any) => {
      console.error("Failed to send OTP:", error);
      res.status(400).send({ error: "Failed to send OTP" });
    });
};

const verifyOtp = async (req: Request, res: Response) => {
  const phone = req.body.phone;
  const otpCode = req.body.otp;

  try {
    // Check if the user with this phone number already exists in your database
    const user = await User.findOne({ mobileNumber: phone });

    // Check OTP
    const verification_check = await twillioClient.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phone, code: otpCode });

    if (verification_check.status === "approved") {
      // Sign a JWT token with the user's phone number
      const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: "365d" });

      // Determine if the user is new or existing based on the database query
      const newUser = user ? false : true;

      res.send({ success: true, token, newUser });
    } else {
      res.status(400).send({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Database or OTP verification error:", error);
    res.status(500).send({ error: "Failed to verify OTP" });
  }
};

const verifyGoogleSignIn = async (req: Request, res: Response) => {
  try {
    const idToken = req.body.idToken;

    // Verify the token sent from the Flutter app using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;

    // Generate a JWT token with the user's email
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "365d" });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error verifying Google sign-in:", error);
    res.status(500).json({ error: "Failed to verify Google sign-in" });
  }
};

export default {
  sendOtp,
  verifyOtp,
  verifyGoogleSignIn,
};
function getAuth() {
  throw new Error("Function not implemented.");
}
