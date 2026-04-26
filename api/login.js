export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const users = [
      { email: "test@gmail.com", password: "1234" },
      { email: "muthu@gmail.com", password: "123456" }
    ];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false });
    }
  }

  res.status(405).json({ message: "Method Not Allowed" });
}