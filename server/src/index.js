import express from "express";
import usersRoutes from "./routes/users.routes.js";
import profilesController from "./routes/profiles.routes.js";
import newsController from "./routes/news.routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/", usersRoutes);
app.use("/api/", profilesController);
app.use("/api/", newsController);

app.use((req, res, next) => {
  res.status(404).json({message: 'Not found'})
})

app.listen(3000);


