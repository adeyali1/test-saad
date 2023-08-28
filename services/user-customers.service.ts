import { IUserCustomers, UserCustomers } from "../models/user-customers";
import { dbConnect } from "./db.service";

export async function getOne(currentUserId: string) {
   try {
      await dbConnect();
      const result = await UserCustomers.findOne({ userId: currentUserId });

      return result?.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function updateOne(frontEndUserCustomers: IUserCustomers) {
   try {
      await dbConnect();
      const updateResult = await UserCustomers.updateOne(
         { _id: frontEndUserCustomers.id },
         {
            $set: { ...frontEndUserCustomers },
         }
      );

      const updatedUserCustomers = await UserCustomers.findById(frontEndUserCustomers.id);
      return updatedUserCustomers?.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(userCustomers: IUserCustomers) {
   try {
      await dbConnect();
      const frontEndUserCustomers = new UserCustomers(userCustomers)
      await frontEndUserCustomers.save();
      return frontEndUserCustomers?.toJSON();
   } catch (error) {
      console.log(error);
   }
}