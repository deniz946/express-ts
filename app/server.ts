import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = process.env.PORT;
const env = process.env.NODE_ENV;

const server = app.listen(port || "3000", () => {
  console.log(`App is running at http://localhost:${port} in ${env} mode`);
  console.log("Press CTRL-C to stop\n");
});

export default server;
