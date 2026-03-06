export const doctorsSwagger = {
  "/api/doctors": {
    get: {
      summary: "Отримати список всіх лікарів",
      tags: ["Doctors"],
      responses: {
        200: { description: "Список лікарів" },
      },
    },
    post: {
      summary: "Додати лікаря (тільки адмін)",
      tags: ["Doctors"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["firstName", "lastName", "email", "specializationId"],
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                specializationId: { type: "integer" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Лікаря створено" },
        403: { description: "Недостатньо прав" },
      },
    },
  },
  "/api/doctors/{id}": {
    get: {
      summary: "Отримати лікаря за ID",
      tags: ["Doctors"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: { description: "Дані лікаря" },
        404: { description: "Лікаря не знайдено" },
      },
    },
    patch: {
      summary: "Оновити дані лікаря (тільки адмін)",
      tags: ["Doctors"],
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
                firstName: { type: "string" },
                lastName: { type: "string" },
                phone: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Лікаря оновлено" },
        404: { description: "Лікаря не знайдено" },
      },
    },
    delete: {
      summary: "Видалити лікаря (тільки адмін)",
      tags: ["Doctors"],
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
        200: { description: "Лікаря видалено" },
        404: { description: "Лікаря не знайдено" },
      },
    },
  },
};