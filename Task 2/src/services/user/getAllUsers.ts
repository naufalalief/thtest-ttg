import { prisma } from "lib/prisma";

export async function getAllUsers(page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    prisma.user.findMany({ skip, take: limit }),
    prisma.user.count(),
  ]);
  return { users, total };
}
