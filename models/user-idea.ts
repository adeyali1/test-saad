import mongoose from "mongoose";
import { IIdea } from "./types";

interface UserIdeasAttrs {
   userId: string;
   startDate?: string;
   ideas: IIdea[];
}

interface UserIdeasDocument extends mongoose.Document, UserIdeasAttrs { }

interface UserIdeasModel extends mongoose.Model<UserIdeasDocument> {
   build(attrs: UserIdeasAttrs): UserIdeasDocument;
}

export interface IUserIdeas extends UserIdeasAttrs {
   id: string;
}

const userIdeasSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      startDate: {
         type: String,
         required: false,
      },
      ideas: {
         type: Array<IIdea>,
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

userIdeasSchema.statics.build = (attrs: UserIdeasAttrs) => {
   return new UserIdeas(attrs);
};

export const UserIdeas =
   mongoose.models.UserIdeas ||
   mongoose.model<UserIdeasDocument, UserIdeasModel>("UserIdeas", userIdeasSchema, "userIdeas");
