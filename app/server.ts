import app from "./app";
import dotenv from "dotenv";
import errorHandler from "errorhandler";
dotenv.config();

const port = process.env.PORT;
const env = process.env.NODE_ENV;

if (env === "development") {
  app.use(errorHandler());
}

const server = app.listen(port || "3000", () => {
  console.log(`App is running at http://localhost:${port} in ${env} mode`);
  console.log("Press CTRL-C to stop\n");
});

export default server;
