import { IUserIdeas, UserIdeas } from '../models/user-idea';
import { IIdea } from "../models/types";
import { ObjectId } from 'mongodb';
import { dbConnect } from './db.service';

export async function getOne(currentUserId: string) {
   try {
      await dbConnect();
      const result = await UserIdeas.findOne({ userId: currentUserId });
      return result?.toJSON();
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function getOneLookup(currentUserId: string) {
   try {
      await dbConnect();
      let result = await UserIdeas.findOne({ userId: currentUserId });
      if (result) {
         result.ideas = result.ideas.map((idea: IIdea) => {
            return {
               uuid: idea.uuid,
               name: idea.name,
               ownerName: idea.ownerName,
            }
         });
      }
      return result;
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function insertOne(userIdeas: IUserIdeas) {
   try {
      await dbConnect();
      const frontEndUserIdeas = new UserIdeas(userIdeas)
      await frontEndUserIdeas.save();
      return frontEndUserIdeas?.toJSON() ?? "faild to create userIdeas collection";
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function updateOne(frontEndUserIdeas: IUserIdeas) {
   try {
      await dbConnect();
      const updateResult = await UserIdeas.updateOne(
         { _id: frontEndUserIdeas.id },
         {
            $set: { ...frontEndUserIdeas },
         }
      );

      const updatedUserIdeas = await UserIdeas.findById(frontEndUserIdeas.id);
      return updatedUserIdeas?.toJSON();
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function insertOrUpdateIdea(idea: IIdea, sessionUser: any) {
   try {
      await dbConnect();

      const result = await UserIdeas.findOne({ userId: sessionUser.id });

      const userIdeas: IUserIdeas = {
         id: result?._id ?? "",
         userId: sessionUser.id,
         ideas: []
      };

      if (result?.ideas?.length) {
         userIdeas.ideas = [...result.ideas, { ...idea }];
      } else {
         userIdeas.ideas = [{ ...idea }];
      }

      if (result) { // update ... otherwise insert 
         const updateResult = await UserIdeas.updateOne(
            { _id: new ObjectId(userIdeas.id) },
            {
               $set: { ...userIdeas },
            }
         );
         const updatedUserIdeas = await UserIdeas.findById(userIdeas.id);
         return updatedUserIdeas?.toJSON();
      }

      const newUserIdeas = new UserIdeas(userIdeas)
      await newUserIdeas.save();
      return newUserIdeas?.toJSON();
   } catch (error) {
      console.log(error);
      throw error;
   }
}

export async function deleteOne(uuid: string, sessionUser: any) {
   try {
      await dbConnect();
      if (!sessionUser?.id) throw new Error("You are not logged in !");

      const result = await UserIdeas.findOne({ userId: sessionUser.id });

      const userIdeas: IUserIdeas = {
         id: result?._id ?? "",
         userId: sessionUser.id,
         ideas: []
      };

      if (result?.ideas?.length) {
         userIdeas.ideas = result.ideas.filter((idea: IIdea) => idea.uuid !== uuid);
      }

      if (result) {
         const updateResult = await UserIdeas.updateOne(
            { _id: new ObjectId(userIdeas.id) },
            {
               $set: { ...userIdeas },
            }
         );
         const updatedUserIdeas = await UserIdeas.findById(userIdeas.id);
         return updatedUserIdeas?.toJSON();
      }

   } catch (error) {
      console.log(error);
      throw error;
   }
}