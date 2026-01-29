import express from "express";
import userRoutes from "./routes";

const app = express();

app.use(express.json());
app.use(userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
