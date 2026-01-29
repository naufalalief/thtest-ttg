import { Request, Response } from "express";
import { getUserByIdService } from "services/user";

export async function getUserByIdController(req: Request, res: Response) {
  const id = req.params.id as string;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID harus diisi",
    });
  }
  const user = await getUserByIdService(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User tidak ditemukan",
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
}
