export interface AppointmentDTO {
  id: number;
  appointmentDate: Date;
  status: string;
  notes: string | null;
  doctor: {
    id: number;
    firstName: string;
    lastName: string;
    specialization?: {
      name: string;
    };
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export const toAppointmentDTO = (appointment: any): AppointmentDTO => ({
  id: appointment.id,
  appointmentDate: appointment.appointmentDate,
  status: appointment.status,
  notes: appointment.notes,
  doctor: {
    id: appointment.doctor.id,
    firstName: appointment.doctor.firstName,
    lastName: appointment.doctor.lastName,
    specialization: appointment.doctor.specialization
      ? { name: appointment.doctor.specialization.name }
      : undefined,
  },
  user: {
    id: appointment.user.id,
    firstName: appointment.user.firstName,
    lastName: appointment.user.lastName,
  },
});