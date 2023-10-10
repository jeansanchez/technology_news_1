import express from "express";
import { pool } from "./db.js";
import usersRoutes from "./routes/users.routes.js";
import morgan from "morgan";

const app = express();
app.use(express.json())
app.use(morgan('dev'));

app.use('/api/', usersRoutes)

app.listen(3000)



app.get('/ping/', async (req, res) => {
    const [result] =  await pool.query('SELECT 1 + 1 AS result');
    res.json(result);
  })