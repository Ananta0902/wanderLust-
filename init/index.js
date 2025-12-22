require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../modules/listing");
const { data } = require("./data");

const dbURL = process.env.ATLASDB_URL; // 🚨 MUST be Atlas

async function main() {
  await mongoose.connect(dbURL);
  console.log("Connected to Atlas");

  const OWNER_ID = "68e69d060eb8553f2f5797ba";

  await Listing.deleteMany({});
  const updatedData = data.map(obj => ({
    ...obj,
    owner: OWNER_ID,
  }));

  await Listing.insertMany(updatedData);
  console.log("Atlas database seeded");

  mongoose.connection.close();
}

main();
