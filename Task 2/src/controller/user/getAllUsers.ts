import { Request, Response } from "express";
import { getAllUserService } from "services/user";

export async function getAllUsersController(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const { users, total } = await getAllUserService(page, limit);
    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: [],
      message: "Failed to fetch users",
    });
  }
}
