import { prisma } from "lib/prisma";

interface UpdateUserInput {
  id: string;
  email?: string;
  fullname?: string;
  password?: string;
}

export async function updateUserService({
  id,
  email,
  fullname,
  password,
}: UpdateUserInput) {
  return prisma.user.update({
    where: { id },
    data: {
      ...(email && { email }),
      ...(fullname && { fullname }),
      ...(password && { password }),
    },
  });
}
