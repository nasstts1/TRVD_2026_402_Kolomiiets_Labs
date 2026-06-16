export const appointmentsSwagger = {
  "/api/appointments": {
    post: {
      summary: "Створити запис на прийом (тільки пацієнт)",
      tags: ["Appointments"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["doctorId", "appointmentDate"],
              properties: {
                doctorId: { type: "integer" },
                appointmentDate: { type: "string", format: "date-time" },
                notes: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Запис створено" },
        403: { description: "Недостатньо прав" },
      },
    },
  },
  "/api/appointments/my": {
    get: {
      summary: "Отримати свої записи (пацієнт)",
      tags: ["Appointments"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: "Список записів пацієнта" },
      },
    },
  },
  "/api/appointments/doctor": {
    get: {
      summary: "Отримати записи лікаря",
      tags: ["Appointments"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: "Список записів лікаря" },
      },
    },
  },
  "/api/appointments/{id}/status": {
    patch: {
      summary: "Оновити статус запису",
      tags: ["Appointments"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  enum: ["PENDING", "CONFIRMED", "CANCELLED"],
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Статус оновлено" },
        404: { description: "Запис не знайдено" },
      },
    },
  },
  "/api/appointments/{id}": {
    delete: {
      summary: "Скасувати запис",
      tags: ["Appointments"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: { description: "Запис скасовано" },
        404: { description: "Запис не знайдено" },
      },
    },
  },
};