// init/index.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const listing = require("../modules/listing.js");
const { data } = require("./data.js"); 

const dbURL = process.env.ATLASDB_URL;

async function main() {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");

    await listing.deleteMany({});
    console.log("Existing listings deleted.");

    const updatedData = data.map((obj) => ({
      ...obj,
      owner: "68e69d060eb8553f2f5797ba", 
      geometry: {
        type: "Point",
        coordinates: [0, 0], 
      },
    }));

    await listing.insertMany(updatedData);
    console.log("Listings initialized successfully.");

    process.exit();
  } catch (err) {
    console.error("Error initializing database:", err);
    process.exit(1);
  }
}

main();
