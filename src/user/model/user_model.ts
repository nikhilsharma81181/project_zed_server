import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  age: number;
  photoUrl: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    age: { type: Number, required: false },
    photoUrl: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IUserModel>("User", UserSchema);
