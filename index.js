const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Dummy users
const users = [
  { email: "test@gmail.com", password: "1234" },
  { email: "muthu@gmail.com", password: "123456" }
];

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Server running on.....");
});