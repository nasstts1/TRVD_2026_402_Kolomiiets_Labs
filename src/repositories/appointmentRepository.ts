import prisma from "../lib/prisma";
import { Status } from "@prisma/client";

export const createAppointment = (data: {
  userId: number;
  doctorId: number;
  appointmentDate: Date;
  notes?: string;
}) => {
  return prisma.appointment.create({
    data,
    include: {
      doctor: true,
      user: true,
    },
  });
};

export const getAppointmentsByUser = (userId: number) => {
  return prisma.appointment.findMany({
    where: { userId },
    include: {
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
};

export const getAppointmentsByDoctor = (doctorId: number) => {
  return prisma.appointment.findMany({
    where: { doctorId },
    include: {
      user: true,
    },
    orderBy: {
      appointmentDate: "asc",
    },
  });
};

export const updateAppointmentStatus = (id: number, status: Status) => {
  return prisma.appointment.update({
    where: { id },
    data: { status },
  });
};

export const getAppointmentById = (id: number) => {
  return prisma.appointment.findUnique({
    where: { id },
    include: {
      doctor: true,
      user: true,
    },
  });
};