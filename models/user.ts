import mongoose from "mongoose";
import { authProviderEnum } from "./enums";

interface UserAttrs {
  fullName: string;
  provider: authProviderEnum;
  email: string;
  phoneNumber: string;
  password: string;
  status: boolean;
  createdAt: Date;
  role: string;
}
interface UserDocument extends mongoose.Document, UserAttrs {}

interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

export interface IUser extends UserAttrs {
  id: string;
}

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: String,
      require: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret.password;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User =
  mongoose.models.User ||
  mongoose.model<UserDocument, UserModel>("User", userSchema, "users");
