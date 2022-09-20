import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.FRONT_PORT || 80
const app = express();

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
