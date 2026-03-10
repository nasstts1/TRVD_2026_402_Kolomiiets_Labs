import prisma from "../lib/prisma";

export const getAllSymptoms = () => {
  return prisma.symptom.findMany();
};

export const getSymptomById = (id: number) => {
  return prisma.symptom.findUnique({ where: { id } });
};

export const createSymptom = (data: {
  name: string;
  description?: string;
}) => {
  return prisma.symptom.create({ data });
};

export const getDoctorsBySymptoms = (symptomIds: number[]) => {
  return prisma.doctor.findMany({
    where: {
      symptoms: {
        some: {
          symptomId: {
            in: symptomIds,
          },
        },
      },
    },
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