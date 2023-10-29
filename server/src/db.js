import { createPool } from "mysql2/promise";
export const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Ajedrez14-17",
  port: 3306,
  database: "users",
});

import { config } from "dotenv";

config();

export const pool = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
