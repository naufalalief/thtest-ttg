import { Request, Response } from "express";
import { deleteUserService } from "services/user";

export async function deleteUserController(req: Request, res: Response) {
  const id = req.params.id as string;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID harus diisi",
    });
  }
  try {
    await deleteUserService(id);
    res.status(200).json({
      success: true,
      message: "User berhasil dihapus",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }
    res.status(500).json({
      success: false,
      message: "Gagal menghapus user",
    });
  }
}
