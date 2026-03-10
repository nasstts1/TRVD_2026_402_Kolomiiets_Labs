import prisma from "../lib/prisma";

export const getAllDoctors = () => {
  return prisma.doctor.findMany({
    include: {
      specialization: true,
    },
  });
};

export const getDoctorById = (id: number) => {
  return prisma.doctor.findUnique({
    where: { id },
    include: {
      specialization: true,
      symptoms: {
        include: {
          symptom: true,
        },
      },
    },
  });
};

export const createDoctor = (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  specializationId: number;
}) => {
  return prisma.doctor.create({ data });
};

export const getDoctorsBySpecialization = (specializationId: number) => {
  return prisma.doctor.findMany({
    where: { specializationId },
    include: {
      specialization: true,
    },
  });
};