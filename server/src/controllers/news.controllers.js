import { pool } from '../db.js';

export const getNewss = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM articles');
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Something goes wrong1' });
  }
};

export const getNews = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: 'User not found',
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'something goes wrong2' });
  }
};

export const createNews = async (req, res) => {
  const { title, article, img } = req.body;
  try {
    const [rows] = await pool.query(
      'INSERT INTO articles (title, article, img) VALUES (?, ?, ?)',
      [title, article, img],
    );
    res.send({
      id: rows.insertId,
      title,
      article,
      img,
    });
  } catch (error) {
    return res.status(500).json({ message: 'something goes wrong3' });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM articles WHERE id = ?', [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: 'User not found' });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, article, img } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE articles SET title = IFNULL(?, title), article = IFNULL(?, article), img = IFNULL(?, img) WHERE id = ?',
      [title, article, img, id],
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'User not found' });

    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
