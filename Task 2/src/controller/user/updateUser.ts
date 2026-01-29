import { Request, Response } from "express";
import { updateUserService } from "services/user";

export async function updateUserController(req: Request, res: Response) {
  const id = req.params.id as string;
  const { email, fullname, password } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID harus diisi",
    });
  }
  if (!email && !fullname && !password) {
    return res.status(400).json({
      success: false,
      message: "Minimal satu field harus diisi",
    });
  }
  try {
    const user = await updateUserService({ id, email, fullname, password });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }
    res.status(500).json({
      success: false,
      message: "Gagal update user",
    });
  }
}
