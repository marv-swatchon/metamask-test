import express from "express";
import cors from "cors";
import router from "./router";

const port = process.env.PORT || 5000;

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use("/", router);
    

    this.app.listen(port, () => console.log(`The process is running on ${port}`));
  }
}