import mongoose from "mongoose";

const MONGODB_URI = Deno.env.get("MONGODB_URI") || "";

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set.");
  Deno.exit(1)
}
const uri = MONGODB_URI;
let mongooseClient: typeof mongoose

try {
  mongooseClient = await mongoose.connect(uri);
  console.log("Connected to MongoDB with mongoose.");
} catch (error) {
  console.error("Error connecting to MongoDB: ", error);
  Deno.exit(1);
}

export default mongooseClient