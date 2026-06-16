import prisma from "../lib/prisma";
import { Role } from "@prisma/client";

export const createUser = (data: {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role?: Role;
}) => {
  return prisma.user.create({ data });
};

export const getUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const getUserById = (id: number) => {
  return prisma.user.findUnique({ where: { id } });
};