import mongoose from "mongoose";
import User from "../model/user.model";
import { AuthenticatedRequest } from "../../../libraries/middleware/types";

import { Request, Response, NextFunction } from "express";
import { createUser, readUser, updateUser, deleteUser } from "../service/user.service";

export async function createUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, phone, age, photoUrl } = req.body;
    const newUser = await createUser({ name, email, phone, age, photoUrl });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

export async function readUserController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const phone = req.user.phone;
    const user = await readUser(phone);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUserController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const phone = req.user.phone;
    const updatedUser = await updateUser(phone, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const phone = req.user.phone;
    const isDeleted = await deleteUser(phone);
    res.status(200).json({ message: isDeleted ? "User deleted successfully" : "User not found" });
  } catch (error) {
    next(error);
  }
}
