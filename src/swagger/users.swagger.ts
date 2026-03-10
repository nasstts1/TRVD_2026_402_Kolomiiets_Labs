export const usersSwagger = {
  "/api/users/me": {
    get: {
      summary: "Отримати свій профіль",
      tags: ["Users"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: "Дані профілю" },
        404: { description: "Користувача не знайдено" },
      },
    },
    patch: {
      summary: "Оновити свій профіль",
      tags: ["Users"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Профіль оновлено" },
      },
    },
  },
  "/api/users/{id}": {
    delete: {
      summary: "Видалити користувача (тільки адмін)",
      tags: ["Users"],
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
        200: { description: "Користувача видалено" },
        404: { description: "Користувача не знайдено" },
      },
    },
  },
};