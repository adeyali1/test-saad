import mongoose from "mongoose";

interface UserAnalysisAttrs {
   userId: string;
   above: string[],
   customers: string[],
   below: string[],
}

interface UserAnalysisDocument extends mongoose.Document, UserAnalysisAttrs { }

interface UserAnalysisModel extends mongoose.Model<UserAnalysisDocument> {
   build(attrs: UserAnalysisAttrs): UserAnalysisDocument;
}

export interface IUserAnalysis extends UserAnalysisAttrs {
   id: string;
}

const userAnalysisSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      above: {
         type: Array<String>,
         required: true
      },
      customers: {
         type: Array<String>,
         required: true
      },
      below: {
         type: Array<String>,
         required: true
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

userAnalysisSchema.statics.build = (attrs: UserAnalysisAttrs) => {
   return new UserAnalysis(attrs);
};

export const UserAnalysis =
   mongoose.models.UserAnalysis ||
   mongoose.model<UserAnalysisDocument, UserAnalysisModel>("UserAnalysis", userAnalysisSchema, "userAnalysis");
