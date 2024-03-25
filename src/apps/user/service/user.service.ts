import mongoose from "mongoose";
import User from "../model/user.model";

export async function createUser(userDetails: any): Promise<any> {
  const { name, email, phone, age, photoUrl } = userDetails;

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      throw new Error("User with this phone number already exists.");
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        phone,
        email,
        age,
      });
      const savedUser = await user.save();
      return savedUser;
    }
  } catch (error) {
    throw new Error("Failed to create user.");
  }
}

export async function readUser(phone: string): Promise<any> {
  try {
    const user = await User.findOne({ phone });
    if (user) {
      return user;
    } else {
      throw new Error("User not found.");
    }
  } catch (error) {
    throw new Error("Failed to read user.");
  }
}

export async function updateUser(
  phone: string,
  updatedDetails: any
): Promise<any> {
  try {
    const user = await User.findOneAndUpdate({ phone }, updatedDetails, {
      new: true,
    });
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  } catch (error) {
    throw new Error("Failed to update user.");
  }
}

export async function deleteUser(phone: string): Promise<boolean> {
  try {
    const user = await User.findOneAndDelete({ phone });
    return user ? true : false;
  } catch (error) {
    throw new Error("Failed to delete user.");
  }
}
