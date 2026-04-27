const express = require("express");
const cors = require("cors");

const app = express();

// ✅ IMPORTANT (Render fix)
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dummy user
const user = {
  email: "test@gmail.com",
  password: "1234",
};

app.post("/login", (req, res) => {
  console.log("Incoming:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (email !== user.email) {
    return res.status(401).json({ message: "User not found" });
  }

  if (password !== user.password) {
    return res.status(401).json({ message: "Wrong password" });
  }

  return res.json({
    success: true,
    message: "Login successful",
    user: { email },
  });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});