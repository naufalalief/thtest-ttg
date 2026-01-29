import express from "express";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("Endpoint /users diakses");
  res.send("OK");
});

export default router;
