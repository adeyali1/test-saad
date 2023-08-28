import { IUserGoals, UserGoals as UserGoals } from "../models/user-goal";
import { dbConnect } from "./db.service";

export async function getOne(currentUserId: string, ISODateString: string) {
   try {
      await dbConnect();
      const result = await UserGoals.findOne({ userId: currentUserId });

      return result?.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function updateOne(frontEndUserGoals: IUserGoals) {
   try {
      await dbConnect();
      const updateResult = await UserGoals.updateOne(
         { _id: frontEndUserGoals.id },
         {
            $set: { ...frontEndUserGoals },
         }
      );

      const updatedUserGoal = await UserGoals.findById(frontEndUserGoals.id);
      return updatedUserGoal?.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(userGoals: IUserGoals) {
   try {
      await dbConnect();
      console.log(userGoals);
      const frontEndUserGoals = new UserGoals(userGoals)
      await frontEndUserGoals.save();
      return frontEndUserGoals?.toJSON();
   } catch (error) {
      console.log(error);
   }
}