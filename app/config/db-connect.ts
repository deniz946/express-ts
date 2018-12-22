import mongoose from "mongoose";
import bluebird from "bluebird";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = <string>process.env.DATABASE;
// we override the mongoose promises library with the bluebird one
mongoose.Promise = bluebird;

class DbConnect {
  start() {
    mongoose
      .connect(
        mongoUrl,
        { useNewUrlParser: true }
      )
      .then(() => {
        console.log("Connected correctly to the database");
      })
      .catch(err => {
        console.log(
          "MongoDB connection error. Please make sure MongoDB is running. "
        );
        process.exit();
      });
  }
}

export default new DbConnect();
