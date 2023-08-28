import { IUserAnalysis, UserAnalysis } from "../models/user-analysis";
import { dbConnect } from "./db.service";

export async function getOne(currentUserId: string) {
   try {
      await dbConnect();
      const result = await UserAnalysis.findOne({ userId: currentUserId });

      return result ? result?.toJSON() : result;
   } catch (error) {
      console.log(error);
   }
}

export async function updateOne(frontEndUserAnalysis: IUserAnalysis) {
   try {
      await dbConnect();
      const updateResult = await UserAnalysis.updateOne(
         { _id: frontEndUserAnalysis.id },
         {
            $set: { ...frontEndUserAnalysis },
         }
      );

      const updatedUserAnalysis = await UserAnalysis.findById(frontEndUserAnalysis.id);
      return updatedUserAnalysis?.toJSON();
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(userAnalysis: IUserAnalysis) {
   try {
      await dbConnect();
      const frontEndUserAnalysis = new UserAnalysis(userAnalysis)
      await frontEndUserAnalysis.save();
      return frontEndUserAnalysis?.toJSON();
   } catch (error) {
      console.log(error);
   }
}
