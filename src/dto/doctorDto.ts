export interface DoctorDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  specialization: {
    id: number;
    name: string;
  };
}

export const toDoctorDTO = (doctor: any): DoctorDTO => ({
  id: doctor.id,
  firstName: doctor.firstName,
  lastName: doctor.lastName,
  email: doctor.email,
  phone: doctor.phone,
  specialization: {
    id: doctor.specialization.id,
    name: doctor.specialization.name,
  },
}); 