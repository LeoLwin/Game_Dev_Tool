require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
PORT = process.env.PORT || 2000;
const login = require("./routes/userRoute");
const bundle = require("./routes/bundleRoute");
const patch = require("./routes/patchRoute");


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: " Hello From Game_Dev_Admin_Tool!!!!!!" });
});

app.use("/login", login);
app.use("/bundle", bundle);
app.use("/patch", patch);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
