import { Router, Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import prisma from "../lib/prisma";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
      if (!user) {
        res.status(404).json({ message: "Користувача не знайдено" });
        return;
      }
      res.json(user);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

router.patch(
  "/me",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { firstName, lastName, email } = req.body;
      const updated = await prisma.user.update({
        where: { id: req.user!.id },
        data: { firstName, lastName, email },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      });
      res.json(updated);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  async (req: AuthRequest, res: Response) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(req.params.id) },
      });
      if (!user) {
        res.status(404).json({ message: "Користувача не знайдено" });
        return;
      }
      await prisma.user.delete({ where: { id: Number(req.params.id) } });
      res.status(200).json({ message: "Користувача видалено" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
);

export default router;