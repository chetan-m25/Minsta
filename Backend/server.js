require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 8000;

connectDB();

app.get("/", (req, res) => {
  res.send("Minsta API is running successfully...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
