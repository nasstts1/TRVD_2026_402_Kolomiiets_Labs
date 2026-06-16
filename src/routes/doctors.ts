import { Router, Request, Response } from "express";
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
} from "../repositories/doctorRepository";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { toDoctorDTO } from "../dto/doctorDto";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const doctors = await getAllDoctors();
    res.json(doctors.map(toDoctorDTO));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const doctor = await getDoctorById(Number(req.params.id));
    if (!doctor) {
      res.status(404).json({ message: "Лікаря не знайдено" });
      return;
    }
    res.json(toDoctorDTO(doctor));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const doctor = await createDoctor(req.body);
      res.status(201).json(doctor);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  async (req: Request, res: Response) => {
    try {
      const doctor = await getDoctorById(Number(req.params.id));
      if (!doctor) {
        res.status(404).json({ message: "Лікаря не знайдено" });
        return;
      }
      const updated = await prisma.doctor.update({
        where: { id: Number(req.params.id) },
        data: req.body,
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
  async (req: Request, res: Response) => {
    try {
      const doctor = await getDoctorById(Number(req.params.id));
      if (!doctor) {
        res.status(404).json({ message: "Лікаря не знайдено" });
        return;
      }
      await prisma.doctor.delete({ where: { id: Number(req.params.id) } });
      res.status(200).json({ message: "Лікаря видалено" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
);

export default router;