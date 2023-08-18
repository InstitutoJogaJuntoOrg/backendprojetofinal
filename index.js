import express from "express";
import cors from "cors";
import useRoutes from "./routes/products.js";

const app = express();

app.use(express.json());
app.use(cors());

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'uploads')));

app.use("/", useRoutes);

app.post("/", (req, res) => {
  console.log(req.body);
});

app.listen(3300);