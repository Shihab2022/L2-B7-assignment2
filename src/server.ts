import { Server } from "http";
import config from "./app/config";
import app from "./app";
import { initDB } from "./db";

async function main() {
  const port = config.port;
  initDB();
  const server: Server = app.listen(port, () => {
    console.log(`App server is running on  ${port} `);
  });
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Server closed!");
      });
    }
    process.exit(1);
  };
  process.on("uncaughtException", (error) => {
    console.log(error);
    exitHandler();
  });

  process.on("unhandledRejection", (error) => {
    console.log(error);
    exitHandler();
  });
}

main();
