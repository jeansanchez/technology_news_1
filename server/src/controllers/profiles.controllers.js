import { pool } from "../db.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const [rows] = await pool.query(
      "INSERT INTO profiles (email, password, username) VALUES (?, ?, ?)",
      [email, passwordHash, username]
    );
    res.send({
      id: rows.insertId,
      email,
      password: passwordHash,
      username,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const data = req.body;
  try {
    const userFound = await pool.query(
      "SELECT * FROM profiles WHERE email = ?",
      [data.email])
      const userData = userFound[0]
      const user = userData[0]
      const result = userData.map (e =>  {
          return e.password
      });

      if (result) {
        const isMatch = await bcrypt.compare(data.password, user.password);
  
        if (!isMatch) {
          res.status(200).json({ message: "password incorrect" });
        } else {
          res.status(200).json({ message: "password correct" });
        }
      } else {
        res.status(401).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  };

export const deleteProfiles = async (req, res) => {
    try {
      const [result] = await pool.query("DELETE FROM profiles WHERE id = ?", [
        req.params.id,
      ]);
      if (result.affectedRows <= 0)
        return res.status(404).json({
          message: "User not found",
        });
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: "something goes wrong4" });
    }
  };

export const logout = async (req, res) => {};