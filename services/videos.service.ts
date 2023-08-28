import { Videos, IVideos } from './../models/videos';
import { dbConnect } from './db.service';

export async function getOne() {
   try {
      await dbConnect();
      const result = await Videos.find();

      return result[0];
   } catch (error) {
      console.log(error);
   }
}

export async function updateOne(videos: IVideos) {
   try {
      await dbConnect();
      console.log("videos", videos);
      const getByIdResult = await Videos.findById(videos.id);
      videos = { ...getByIdResult?.toJSON(), ...videos };

      console.log("getByIdResult from inside the service", getByIdResult);
      console.log("videos from inside the service", videos);

      const updateResult = await Videos.updateOne(
         { _id: videos.id },
         {
            $set: { ...videos },
         }
      );

      const updatedVideos = await Videos.findById(videos.id);
      return updatedVideos?.toJSON() ?? false;
   } catch (error) {
      console.log(error);
   }
}

export async function insertOne(videos: IVideos) {
   try {
      await dbConnect();
      const newVideos = new Videos(videos)
      await newVideos.save();
      return newVideos?.toJSON();
   } catch (error) {
      console.log(error);
   }
}