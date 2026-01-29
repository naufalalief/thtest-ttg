import { prisma } from "lib/prisma";

export async function deleteUserService(id: string) {
  return prisma.user.delete({ where: { id } });
}
