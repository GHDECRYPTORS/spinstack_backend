import * as middlewares from "./middlewares";
import * as mongoose from "mongoose";

import MessageResponse from "./interfaces/MessageResponse";
import SetUserMiddleware from "./middlewares/setUser.middleware";
import api from "./api";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

require("dotenv").config();

const app = express();
mongoose.connect(process.env.MONGO_URI as string).then(() => {
  console.log("Connected to Database");
});
mongoose.set("debug", process.env.NODE_ENV != "production");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use(SetUserMiddleware);
// allow only mongo ids on route params named id
app.use(middlewares.validMongoIds);
app.use("/api/v1", api);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
export default app;
