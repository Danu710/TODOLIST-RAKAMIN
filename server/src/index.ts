import express, { Application, Request, Response } from "express";
//import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { config as dotenv } from "dotenv";

//Router
import UserRoutes from "./routers/UserRoutes";
import AuthRoutes from "./routers/AuthRoutes";
import TodoRoutes from "./routers/TodoRoutes";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }

  protected plugins(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Ini Route Menggunakan TS");
    });

    //this.app.use(express.json());
    this.app.use("/users", UserRoutes);
    this.app.use("/auth", AuthRoutes);
    this.app.use("/todos", TodoRoutes);
  }
}

const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);

  console.log(process.env.DB_HOST);
});

// const app = express();

// app.route("/").get((req, res) => {
//   res.send("Hello World!");
// });

// app.listen(8000);
