import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Ajedrez14-17',
    port: 3306, 
    database: 'users'
})