import mongoose, { Mongoose } from "mongoose";

export async function dbConnect() {
   const client = await mongoose.connect(process?.env?.MONGODB_CONNECTION_STRING ?? "mongodb://127.0.0.1:27017/panel");
   return client;
}

dbConnect()