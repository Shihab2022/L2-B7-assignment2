import express from "express";
import cors from "cors";
// import { rootRouter } from "./app/routes";
// import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { testingRoute } from "./constant/test.route";
import { corsAllowOrigin } from "./constant/common";
import notFound from "./constant/not.found";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors(corsAllowOrigin));
app.use(express.json());
app.use(cookieParser());

app.get("/", testingRoute);
// app.use("/api/v1", rootRouter);
// app.use(globalErrorHandler);

app.use(notFound);
export default app;
