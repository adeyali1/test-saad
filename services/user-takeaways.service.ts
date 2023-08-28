import { IUserTakeaways, UserTakeaways } from '../models/user-takeaways';
import { ITakeaway } from "../models/types";
import { ObjectId } from 'mongodb';
import { dbConnect } from './db.service';
import { takeawayTypeEnums } from '../models/enums';

export async function getOne(currentUserId: string) {
   try {
      await dbConnect();
      const result = await UserTakeaways.findOne({ userId: currentUserId });
      return result?.toJSON();
   } catch (error) {
      console.log(error);
      throw new Error(error as any);
   }
}

export async function insertOne(userTakeaways: IUserTakeaways) {
   try {
      await dbConnect();
      const frontEndUserTakeaways = new UserTakeaways(userTakeaways)
      await frontEndUserTakeaways.save();
      return frontEndUserTakeaways?.toJSON() ?? "faild to create userTakeaways collection";
   } catch (error) {
      console.log(error);
      throw new Error(error as any);
   }
}

export async function updateOne(frontEndUserTakeaways: IUserTakeaways) {
   try {
      await dbConnect();
      const updateResult = await UserTakeaways.updateOne(
         { _id: frontEndUserTakeaways.id },
         {
            $set: { ...frontEndUserTakeaways },
         }
      );

      const updatedUserTakeaways = await UserTakeaways.findById(frontEndUserTakeaways.id);
      return updatedUserTakeaways?.toJSON();
   } catch (error) {
      console.log(error);
      throw new Error(error as any);
   }
}

export async function insertOrUpdateTakeaway(takeaway: ITakeaway, sessionUser: any) {
   try {
      await dbConnect();

      if (!sessionUser?.id) throw new Error("You are not logged in !");

      const result = await UserTakeaways.findOne({ userId: sessionUser.id });

      const userTakeaways: IUserTakeaways = {
         id: result?._id ?? "",
         userId: sessionUser.id,
         takeaways: []
      };

      if (result?.takeaways?.length) {
         userTakeaways.takeaways = [...result.takeaways, { ...takeaway }];
      } else {
         userTakeaways.takeaways = [{ ...takeaway }];
      }

      if (result) { // update ... otherwise insert 
         const updateResult = await UserTakeaways.updateOne(
            { _id: new ObjectId(userTakeaways.id) },
            {
               $set: { ...userTakeaways },
            }
         );
         const updatedUserTakeaways = await UserTakeaways.findById(userTakeaways.id);
         return updatedUserTakeaways?.toJSON();
      }

      const newUserTakeaways = new UserTakeaways(userTakeaways)
      await newUserTakeaways.save();
      return newUserTakeaways?.toJSON();
   } catch (error) {
      console.log(error);
      throw new Error(error as any);
   }
}

export async function deleteOne(type: takeawayTypeEnums, sessionUser: any) {
   try {
      await dbConnect();
      if (!sessionUser?.id) throw new Error("You are not logged in !");

      const result = await UserTakeaways.findOne({ userId: sessionUser.id });

      const userTakeaways: IUserTakeaways = {
         id: result?._id ?? "",
         userId: sessionUser.id,
         takeaways: []
      };

      if (result?.takeaways?.length) {
         userTakeaways.takeaways = result.takeaways.filter((takeaway: ITakeaway) => takeaway.type !== type);
      }

      if (result) {
         const updateResult = await UserTakeaways.updateOne(
            { _id: new ObjectId(userTakeaways.id) },
            {
               $set: { ...userTakeaways },
            }
         );
         const updatedUserTakeaways = await UserTakeaways.findById(userTakeaways.id);
         return updatedUserTakeaways?.toJSON();
      }

   } catch (error) {
      console.log(error);
   }
}