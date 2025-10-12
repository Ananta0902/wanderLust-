const mongoose = require("mongoose");
const {data} = require("./data.js");
const listing = require("../modules/listing.js");

const mongoURL = "mongodb://127.0.0.1:27017/wanderLust";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoURL);
  console.log(" MongoDB connected");
}

const initData = async () => {
  await listing.deleteMany({});
 const updatedData = data.map((obj) => ({
  ...obj,
  owner: "68e69d060eb8553f2f5797ba"
}));

  await listing.insertMany(updatedData);   
  console.log("Data was initialized");
};

initData();


