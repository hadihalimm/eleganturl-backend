import mongooseClient from "./db.ts";


const urlSchema = new mongooseClient.Schema({
  alias: { type: String, unique: true, index: true },
  originalUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const urlModel = mongooseClient.model("urls", urlSchema);
export default urlModel;
