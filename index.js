import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello Ambrose Welcome Back");
});

// GET REQUEST
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// CREATE REQUEST
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
  const value = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [value], (err, data) => {
    if (err) return res.json(err);
    return res.json("Created successfully" + data);
  });
});

// UPDATE REQUEST
app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const q = "UPDATE books SET `title`=?, `desc`=?, `cover`=? WHERE `id` = ?";
  const value = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [...value, id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Updated Success");
  });
});

// DELETE REQUEST
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM books WHERE `id`=?";
  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Deleted Book Successful");
  });
});

app.listen(5000, () => {
  console.log("Server Started...");
});
