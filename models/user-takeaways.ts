import mongoose from "mongoose";
import { ITakeaway } from "./types";

interface UserTakeawaysAttrs {
   userId: string;
   takeaways: ITakeaway[];
}

interface UserTakeawaysDocument extends mongoose.Document, UserTakeawaysAttrs { }

interface UserTakeawaysModel extends mongoose.Model<UserTakeawaysDocument> {
   build(attrs: UserTakeawaysAttrs): UserTakeawaysDocument;
}

export interface IUserTakeaways extends UserTakeawaysAttrs {
   id: string;
}

const userTakeawaysSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      takeaways: {
         type: Array<ITakeaway>,
         required: true,
      }
   },
   {
      toJSON: {
         transform(doc, ret) {
            ret.id = ret._id.toString();
         },
      },
   }
);

userTakeawaysSchema.statics.build = (attrs: UserTakeawaysAttrs) => {
   return new UserTakeaways(attrs);
};

export const UserTakeaways =
   mongoose.models.UserTakeaways ||
   mongoose.model<UserTakeawaysDocument, UserTakeawaysModel>("UserTakeaways", userTakeawaysSchema, "userTakeaways");
