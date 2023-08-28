import mongoose from "mongoose";

interface UserGoalsAttrs {
   userId: string;
   targetDate: string;
   goals: string[];
}

interface UserGoalDocument extends mongoose.Document, UserGoalsAttrs { }

interface UserGoalModel extends mongoose.Model<UserGoalDocument> {
   build(attrs: UserGoalsAttrs): UserGoalDocument;
}

export interface IUserGoals extends UserGoalsAttrs {
   id: string;
}

const userGoalSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      targetDate: {
         type: String,
         required: true,
      },
      goals: {
         type: Array<String>,
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

userGoalSchema.statics.build = (attrs: UserGoalsAttrs) => {
   return new UserGoals(attrs);
};

export const UserGoals =
   mongoose.models.UserGoals ||
   mongoose.model<UserGoalDocument, UserGoalModel>("UserGoals", userGoalSchema, "userGoals");
