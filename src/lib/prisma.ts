import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  adapter: null as any,
} as any);

export default prisma;