require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
PORT = process.env.PORT || 2000;
const login = require("./routes/route");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: " Hello From Game_Dev_Admin_Tool!!!!!!" });
});

app.use("/login", login);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
