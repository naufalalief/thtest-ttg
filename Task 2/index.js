import("dotenv/config");
import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Endpoint / diakses");
  res.send("OK");
});

app.use("/users", router);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
