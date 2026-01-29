import { prisma } from "lib/prisma";
import bcrypt from "bcrypt";

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
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, fullname, password: hashedPassword },
  });
}
