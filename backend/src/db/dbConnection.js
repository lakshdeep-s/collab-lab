import mongoose from "mongoose"
import config from "../config/index.js"
const MONGO_URI = config.db


/**
 * The function `checkMongoConnection` connects to a MongoDB database using the provided URI and logs a
 * success message or an error message accordingly.
 */
export function checkMongoConnection() {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected")
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err)
    })
}


/* This code snippet is creating a new connection to the MongoDB database using Mongoose. */
export const dbConnection = mongoose.createConnection(MONGO_URI, {dbName: 'AppDB'})
