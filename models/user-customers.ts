import mongoose from "mongoose";

interface UserCustomersAttrs {
   userId: string;
   topCategories: string[],
   wishlist: string[],
   fulfill: string[],
}

interface UserCustomersDocument extends mongoose.Document, UserCustomersAttrs { }

interface UserCustomersModel extends mongoose.Model<UserCustomersDocument> {
   build(attrs: UserCustomersAttrs): UserCustomersDocument;
}

export interface IUserCustomers extends UserCustomersAttrs {
   id: string;
}

const userCustomersSchema = new mongoose.Schema(
   {
      userId: {
         type: String,
         required: true,
      },
      topCategories: {
         type: Array<String>,
         required: true
      },
      wishlist: {
         type: Array<String>,
         required: true
      },
      fulfill: {
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

userCustomersSchema.statics.build = (attrs: UserCustomersAttrs) => {
   return new UserCustomers(attrs);
};

export const UserCustomers =
   mongoose.models.UserCustomers ||
   mongoose.model<UserCustomersDocument, UserCustomersModel>("UserCustomers", userCustomersSchema, "userCustomers");
