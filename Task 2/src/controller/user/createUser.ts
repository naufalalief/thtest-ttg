import { Request, Response } from "express";
import { createUserService } from "services/user";

export async function createUserController(req: Request, res: Response) {
  try {
    const { email, fullname, password } = req.body;
    if (!email || !fullname || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, fullname, dan password harus diisi",
      });
    }
    const user = await createUserService({ email, fullname, password });
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }
    res.status(500).json({
      success: false,
      message: "Gagal membuat user",
    });
  }
}
