const mongoose = require("mongoose");

async function connectMongo(uri?: string) {
  const MONGO_URI = uri || process.env.MONGO_URI;
  mongoose.set("strictQuery", true);
  await mongoose.connect(MONGO_URI);
  console.log("[MongoDB] connected:", MONGO_URI);
}

module.exports = { connectMongo, mongoose };
