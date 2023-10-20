import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM admins");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong1" });
  }
};

export const getUser = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM admins WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: "User not found",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong2" });
  }
};

export const createUsers = async (req, res) => {
  const { name, lastname, username, email, password, role } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO admins(name, lastname, username, email, password, role) VALUES (?, ?, ?, ?, ?, ?)",
      [name, lastname, username, email, password, role]
    );
    res.send({
      id: rows.insertId,
      name,
      lastname,
      username,
      email,
      password,
      role,
    });
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong3" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM admins WHERE id = ?", [
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

export const updateUsers = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, username, email, password, role } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE admins SET name = IFNULL(?, name), lastname = IFNULL(?, lastname), username = IFNULL(?, username), email = IFNULL(?, email), password = IFNULL(?, password), role = IFNULL(?, role) WHERE id = ?",
      [name, lastname, username, email, password, role, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "User not found",
      });

    const [rows] = await pool.query("SELECT * FROM admins WHERE id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong5" });
  }
};
