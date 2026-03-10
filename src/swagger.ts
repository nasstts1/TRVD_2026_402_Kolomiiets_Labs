import swaggerJsdoc from "swagger-jsdoc";
import { symptomsSwagger } from "./swagger/symptoms.swagger";
import { usersSwagger } from "./swagger/users.swagger";
import { doctorsSwagger } from "./swagger/doctors.swagger";
import { authSwagger } from "./swagger/auth.swagger";
import { appointmentsSwagger } from "./swagger/appointments.swagger";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Clinic API",
      version: "1.0.0",
      description: "API для інформаційно-довідкової системи медичного закладу",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Локальний сервер",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      ...authSwagger,
      ...appointmentsSwagger,
      ...symptomsSwagger,
      ...usersSwagger,
      ...doctorsSwagger,
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);