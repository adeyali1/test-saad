import mongoose from "mongoose";
import { IProduct } from "./types";

interface UserProductAttrs {
   userId: string;
   products: IProduct[];
}

interface UserProductDocument extends mongoose.Document, UserProductAttrs { }

interface UserProductModel extends mongoose.Model<UserProductDocument> {
   build(attrs: UserProductAttrs): UserProductDocument;
}

export interface IUserProduct extends UserProductAttrs {
   id: string;
}

const userProductSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      products: {
         type: Array<IProduct>,
         required: true,
      },
   },
   {
      toJSON: {
         transform(doc, ret) {
            ret.id = ret._id.toString();
         },
      },
   }
);

userProductSchema.statics.build = (attrs: UserProductAttrs) => {
   return new UserProduct(attrs);
};

export const UserProduct =
   mongoose.models.UserProduct ||
   mongoose.model<UserProductDocument, UserProductModel>("UserProduct", userProductSchema, "userProducts");
