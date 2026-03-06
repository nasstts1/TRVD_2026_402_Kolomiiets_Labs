import { Router, Response } from "express";
import {
  createAppointment,
  getAppointmentsByUser,
  getAppointmentsByDoctor,
  updateAppointmentStatus,
  getAppointmentById,
} from "../repositories/appointmentRepository";
import { toAppointmentDTO } from "../dto/appointmentDto";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Status } from "@prisma/client";
import prisma from "../lib/prisma";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("PATIENT"),
  async (req: AuthRequest, res: Response) => {
    try {
      const appointment = await createAppointment({
        userId: req.user!.id,
        doctorId: req.body.doctorId,
        appointmentDate: new Date(req.body.appointmentDate),
        notes: req.body.notes,
      });
      res.status(201).json(toAppointmentDTO(appointment));
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("PATIENT"),
  async (req: AuthRequest, res: Response) => {
    try {
      const appointments = await getAppointmentsByUser(req.user!.id);
      res.json(appointments.map(toAppointmentDTO));
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

router.get(
  "/doctor",
  authMiddleware,
  roleMiddleware("DOCTOR"),
  async (req: AuthRequest, res: Response) => {
    try {
      const appointments = await getAppointmentsByDoctor(req.user!.id);
      res.json(appointments.map(toAppointmentDTO));
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

router.patch(
  "/:id/status",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const appointment = await getAppointmentById(Number(req.params.id));
      if (!appointment) {
        res.status(404).json({ message: "Запис не знайдено" });
        return;
      }
      const updated = await updateAppointmentStatus(
        Number(req.params.id),
        req.body.status as Status
      );
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
  async (req: AuthRequest, res: Response) => {
    try {
      const appointment = await getAppointmentById(Number(req.params.id));
      if (!appointment) {
        res.status(404).json({ message: "Запис не знайдено" });
        return;
      }
      if (
        req.user!.role === "PATIENT" &&
        appointment.userId !== req.user!.id
      ) {
        res.status(403).json({ message: "Недостатньо прав доступу" });
        return;
      }
      await prisma.appointment.delete({
        where: { id: Number(req.params.id) },
      });
      res.status(200).json({ message: "Запис скасовано" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
);

export default router;