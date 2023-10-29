import express from "express";
import usersRoutes from "./routes/users.routes.js";
import authController from "./routes/auth.routes.js";
import newsController from "./routes/news.routes.js";
import morgan from "morgan";

import newsRoutes from "./routes/news.routes.
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/", usersRoutes);
app.use("/api/", authController);
app.use("/api/", newsController);
app.use("/api/", newsRoutes);


app.use((req, res, next) => {
  res.status(404).json({message: 'Not found'})
})

app.listen(3000);


