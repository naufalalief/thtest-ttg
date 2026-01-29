import { Request, Response } from "express";
import { createUser } from "services/user/createUser";

export async function createUserController(req: Request, res: Response) {
  try {
    const { email, fullname, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi",
      });
    }
    const user = await createUser({ email, fullname, password });
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
