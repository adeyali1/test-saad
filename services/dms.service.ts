import { IBlob, Blob } from "../models/blob";
import { dbConnect } from "./db.service";

export async function storeBlob(blob: IBlob) {
  try {
    await dbConnect();
    const newBlob = new Blob(blob);
    await newBlob.save()
    return newBlob;
  } catch (error) {
    console.log('dms.service.storeBlob', error);
  }
}

export async function getCourseBlobs(courseId: string, type: string) {
  try {
    await dbConnect();
    return await Blob.find({ courseId: courseId, type: type });
  } catch (error) {
    console.log("dms.service.getCourseBlobs", error);
  }
}


export async function deleteBlob(blobId: string) {
  try {
    await dbConnect();
    return await Blob.deleteOne({ blobId: blobId });
  } catch (error) {
    console.log("dms.service.deleteBlob", error);
  }
}
