import { prisma } from "lib/prisma";

interface CreateUserInput {
  email: string;
  fullname?: string;
  password: string;
}

export async function createUser({
  email,
  fullname,
  password,
}: CreateUserInput) {
  return prisma.user.create({
    data: { email, fullname, password },
  });
}
