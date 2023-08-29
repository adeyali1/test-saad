import mongoose, { Mongoose } from "mongoose";

// process?.env?.MONGODB_CONNECTION_STRING ??
export async function dbConnect() {
   const client = await mongoose.connect( "mongodb://127.0.0.1:27017/panel");
   return client;
}

dbConnect()