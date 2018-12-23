import mongoose from "mongoose";
import bluebird from "bluebird";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.DATABASE as string;
// we override the mongoose promises library with the bluebird one
mongoose.Promise = bluebird;

class DbConnect {
  public start() {
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
