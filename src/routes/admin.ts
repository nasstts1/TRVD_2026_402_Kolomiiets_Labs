import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { getAllDoctors, createDoctor } from "../repositories/doctorRepository";
import { getAllSymptoms, createSymptom } from "../repositories/symptomRepository";
import prisma from "../lib/prisma";

const router = Router();

// всі маршрути захищені — тільки ADMIN
router.use(authMiddleware, roleMiddleware("ADMIN"));

// отримати всіх лікарів
router.get("/doctors", async (req: Request, res: Response) => {
  try {
    const doctors = await getAllDoctors();
    res.json(doctors);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

// додати лікаря
router.post("/doctors", async (req: Request, res: Response) => {
  try {
    const doctor = await createDoctor(req.body);
    res.status(201).json(doctor);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
});

// отримати всі записи
router.get("/appointments", async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: true,
        doctor: {
          include: {
            specialization: true,
          },
        },
      },
      orderBy: {
        appointmentDate: "asc",
      },
    });
    res.json(appointments);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

// отримати всі спеціалізації
router.get("/specializations", async (req: Request, res: Response) => {
  try {
    const specializations = await prisma.specialization.findMany();
    res.json(specializations);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

// додати спеціалізацію
router.post("/specializations", async (req: Request, res: Response) => {
  try {
    const specialization = await prisma.specialization.create({
      data: req.body,
    });
    res.status(201).json(specialization);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
});

// додати симптом
router.post("/symptoms", async (req: Request, res: Response) => {
  try {
    const symptom = await createSymptom(req.body);
    res.status(201).json(symptom);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
});

export default router;