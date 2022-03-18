const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/afuwa", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
    });

    console.log("monogDB connected successfully");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
